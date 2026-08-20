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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatAngka } from "@/lib/utils";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { keepPreviousData } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  HiOutlineChevronDown,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineSearch,
  HiOutlineTrash,
} from "react-icons/hi";
import { Link, getRouteApi } from "@tanstack/react-router";
import { MonthFilter, defaultDateRange } from "@/components/month-filter";
import { useAuth } from "@/lib/auth";
import { useDebounce } from "use-debounce";

const routeApi = getRouteApi("/_dashboard/belanja/sp2d/");

export default function Sp2dTable() {
  const utils = api.useUtils();
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const [searchValue] = useDebounce(search.search ?? "", 300);

  const { user } = useAuth();
  const tahun = user?.tahun ?? "2026";
  const startDate = search.startDate || defaultDateRange(tahun).startDate;
  const endDate = search.endDate || defaultDateRange(tahun).endDate;

  const { data: sp2d } = api.sp2d.getAll.useQuery(
    {
      search: searchValue ?? "",
      startDate,
      endDate,
      page: Number(search.page ?? 1),
      pageSize: Number(search.pageSize ?? 10),
    },
    { suspense: true, placeholderData: keepPreviousData },
  );

  const deleteItem = api.sp2d.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.sp2d.invalidate();
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  if (!sp2d) return <div>Data tidak dapat dimuat.</div>;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between gap-5">
        <MonthFilter
          startDate={startDate}
          endDate={endDate}
          tahun={tahun}
          onChange={(range) =>
            navigate({ search: (prev) => ({ ...prev, ...range }) })
          }
        />
        <div className="flex flex-row items-center gap-5">
          <Select
            value={search.pageSize ?? "10"}
            onValueChange={(val) => {
              navigate({
                search: (prev) => ({
                  ...prev,
                  pageSize: val ?? "",
                  page: "1",
                }),
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
              <HiOutlineSearch className="text-gray-400" />
            </div>
            <Input
              className="pl-10"
              placeholder="Cari data..."
              value={search.search ?? ""}
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
            <TableHead className="w-1">No.</TableHead>
            <TableHead>Tanggal Dokumen</TableHead>
            <TableHead>Nomor Dokumen</TableHead>
            <TableHead>Uraian Dokumen</TableHead>
            <TableHead className="text-center">Nomor Cek</TableHead>
            <TableHead className="text-right">Jumlah</TableHead>
            <TableHead className="w-1" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sp2d.data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">
                {formatAngka(sp2d.meta.pagination.firstRow + index)}.
              </TableCell>
              <TableCell className="text-center">
                {format(item.tglDokumen!, "dd/MM/yyyy")}
              </TableCell>
              <TableCell className="text-center font-semibold">
                {item.noDokumen}
              </TableCell>
              <TableCell>{item.uraian}</TableCell>
              <TableCell className="text-center">{item.noCek}</TableCell>
              <TableCell className="text-right font-semibold">
                {formatAngka(item.jumlah)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                      Aksi <HiOutlineChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <Link
                      to="/belanja/sp2d/$sp2dId"
                      params={{ sp2dId: String(item.id) }}
                    >
                      <DropdownMenuItem>
                        <HiOutlineEye />
                        Detail
                      </DropdownMenuItem>
                    </Link>
                    <Link
                      to="/belanja/sp2d/$sp2dId/edit"
                      params={{ sp2dId: String(item.id) }}
                    >
                      <DropdownMenuItem>
                        <HiOutlinePencil />
                        Edit
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onClick={() => {
                        if (confirm("Apakah anda yakin menghapus data ini?")) {
                          deleteItem.mutate(item.id);
                        }
                      }}
                      className="text-red-500"
                    >
                      <HiOutlineTrash />
                      Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {sp2d.data.length === 0 && (
            <TableRow>
              <TableCell colSpan={100} className="text-center">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableCaption>
          Menampilkan data {formatAngka(sp2d.meta.pagination.firstRow)}-
          {formatAngka(sp2d.meta.pagination.lastRow)} dari{" "}
          {formatAngka(sp2d.meta.pagination.dataFiltered)}/
          {formatAngka(sp2d.meta.pagination.dataTotal)} data.
        </TableCaption>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (Number(sp2d.meta.pagination.page) > 1) {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page: String(Number(sp2d.meta.pagination.page) - 1),
                    }),
                  });
                }
              }}
            />
          </PaginationItem>
          <Select
            value={String(sp2d.meta.pagination.page)}
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
                  length: Number(sp2d.meta.pagination.pageCount),
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
                  Number(sp2d.meta.pagination.page) <
                  Number(sp2d.meta.pagination.pageCount)
                ) {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page: String(Number(sp2d.meta.pagination.page) + 1),
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