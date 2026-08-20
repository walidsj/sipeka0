import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatAngka } from "@/lib/utils";
import { api } from "@/trpc/react";
import { keepPreviousData } from "@tanstack/react-query";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import toast from "react-hot-toast";
import { FiChevronsDown, FiEdit, FiSearch, FiTrash } from "react-icons/fi";
import { Link, getRouteApi } from "@tanstack/react-router";
import { useDebounce } from "use-debounce";
import { MonthFilter, defaultDateRange } from "@/components/month-filter";
import { useAuth } from "@/lib/auth";

const routeApi = getRouteApi("/_dashboard/pendapatan/perekaman/");

export default function PendapatanTable() {
  const utils = api.useUtils();

  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const [searchValue] = useDebounce(search["search"] ?? "", 300);

  const { user } = useAuth();
  const tahun = user?.tahun ?? "2026";
  const startDate = search["startDate"] || defaultDateRange(tahun).startDate;
  const endDate = search["endDate"] || defaultDateRange(tahun).endDate;

  const { data: pendapatan } = api.pendapatan.getAll.useQuery(
    {
      search: searchValue ?? "",
      startDate,
      endDate,
      page: Number(search["page"] ?? 1),
      pageSize: Number(search["pageSize"] ?? 10),
    },
    { placeholderData: keepPreviousData, suspense: true },
  );

  const deletePendapatan = api.pendapatan.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.pendapatan.invalidate();
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  if (!pendapatan) {
    return <div>Data tidak dapat dimuat.</div>;
  }

  const totalPendapatan = pendapatan.data?.reduce(
    (acc, item) => acc + Number(item.jumlah),
    0,
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between gap-5">
        <MonthFilter
          startDate={startDate}
          endDate={endDate}
          tahun={tahun}
          onChange={(range) =>
            navigate({ search: (prev) => ({ ...prev, page: "1", ...range }) })
          }
        />
        <div className="flex flex-row items-center gap-5">
          <Select
            value={search["pageSize"] ?? "10"}
            onValueChange={(val) => {
              navigate({
                search: (prev) => ({ ...prev, pageSize: val ?? "", page: "1" }),
              });
            }}
          >
            <SelectTrigger className="w-20 font-semibold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center justify-center px-3">
              <FiSearch className="text-gray-400" />
            </div>
            <Input
              className="pl-10"
              placeholder="Cari data..."
              value={search["search"] ?? ""}
              onChange={(e) => {
                navigate({
                  search: (prev) => ({
                    ...prev,
                    search: e.target.value,
                    page: "1",
                  }),
                });
              }}
            />
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1 text-center">No.</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Kode Rekening</TableHead>
            <TableHead>Uraian</TableHead>
            <TableHead className="text-right">Jumlah</TableHead>
            <TableHead className="w-1" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendapatan.data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="text-center">
                {formatAngka(pendapatan.meta.pagination.firstRow + index)}.
              </TableCell>

              <TableCell className="w-32 font-semibold">
                {format(String(item.tglDokumen), "dd MMMM yyyy", {
                  locale: id,
                })}
              </TableCell>
              <TableCell className="w-60">
                <p className="font-medium">{item.rap?.uraian}</p>
                <p className="text-sm text-slate-500">
                  {item.rap?.kodeRekening}
                </p>
                <p className="text-xs text-slate-500">
                  {item.rekening?.uraian}
                </p>
              </TableCell>
              <TableCell className="font-semibold">{item.keterangan}</TableCell>
              <TableCell className="text-right font-semibold">
                {Number(item.jumlah).toLocaleString("id-ID")}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                      Aksi <FiChevronsDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <Link
                      to="/pendapatan/perekaman/$pendapatanId/edit"
                      params={{ pendapatanId: String(item.id) }}
                    >
                      <DropdownMenuItem>
                        <FiEdit />
                        Edit
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onClick={() => {
                        if (confirm("Apakah anda yakin menghapus data ini?")) {
                          deletePendapatan.mutate(item.id);
                        }
                      }}
                      className="text-red-500"
                    >
                      <FiTrash />
                      Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {pendapatan.data.length === 0 && (
            <TableRow>
              <TableCell colSpan={56} className="text-center">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">
              {formatAngka(totalPendapatan)}
            </TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}>Total Keseluruhan</TableCell>
            <TableCell className="text-right">
              {formatAngka(pendapatan.totalSum)}
            </TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
        <TableCaption>
          Menampilkan data {formatAngka(pendapatan.meta.pagination.firstRow)}-
          {formatAngka(pendapatan.meta.pagination.lastRow)} dari{" "}
          {formatAngka(pendapatan.meta.pagination.dataFiltered)}/
          {formatAngka(pendapatan.meta.pagination.dataTotal)} data.
        </TableCaption>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (Number(pendapatan.meta.pagination.page) > 1) {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page: String(Number(pendapatan.meta.pagination.page) - 1),
                    }),
                  });
                }
              }}
            />
          </PaginationItem>
          <Select
            value={String(pendapatan.meta.pagination.page)}
            onValueChange={(val) => {
              navigate({
                search: (prev) => ({ ...prev, page: val ?? "1" }),
              });
            }}
          >
            <SelectTrigger className="w-20 font-semibold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                {
                  length: Number(pendapatan.meta.pagination.pageCount),
                },
                (_, i) => i + 1,
              ).map((page) => (
                <SelectItem key={page} value={String(page)}>
                  {page}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (
                  Number(pendapatan.meta.pagination.page) <
                  Number(pendapatan.meta.pagination.pageCount)
                ) {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page: String(Number(pendapatan.meta.pagination.page) + 1),
                    }),
                  });
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
