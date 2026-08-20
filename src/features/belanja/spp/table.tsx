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
import { FaCheckCircle } from "react-icons/fa";
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

const routeApi = getRouteApi("/_dashboard/belanja/spp/");

export default function SppTable() {
  const utils = api.useUtils();
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const [searchValue] = useDebounce(search.search ?? "", 300);

  const { user } = useAuth();
  const tahun = user?.tahun ?? "2026";
  const startDate = search.startDate || defaultDateRange(tahun).startDate;
  const endDate = search.endDate || defaultDateRange(tahun).endDate;

  const { data: spp } = api.spp.getAll.useQuery(
    {
      search: searchValue ?? "",
      startDate,
      endDate,
      page: Number(search.page ?? 1),
      pageSize: Number(search.pageSize ?? 10),
    },
    { suspense: true, placeholderData: keepPreviousData },
  );

  const deleteItem = api.spp.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.spp.invalidate();
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  if (!spp) return <div>Data tidak dapat dimuat.</div>;

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
            <TableHead className="text-right">Jumlah</TableHead>
            <TableHead className="w-1" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {spp.data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">
                {formatAngka(spp.meta.pagination.firstRow + index)}.
              </TableCell>
              <TableCell className="text-center">
                {format(item.tglDokumen!, "dd/MM/yyyy")}
              </TableCell>
              <TableCell className="text-center font-semibold">
                {item.noDokumen}
              </TableCell>

              <TableCell>
                {item.uraian}
                <br />
                <br />
                {item.spm && (
                  <span className="text-xs font-medium text-neutral-400">
                    <FaCheckCircle className="mr-0.5 inline-flex text-green-500" />
                    SPM
                  </span>
                )}{" "}
                {item.sp2d && (
                  <span className="text-xs font-medium text-neutral-400">
                    <FaCheckCircle className="mr-0.5 inline-flex text-green-500" />
                    SP2D
                  </span>
                )}{" "}
              </TableCell>
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
                      to="/belanja/spp/$sppId"
                      params={{ sppId: String(item.id) }}
                    >
                      <DropdownMenuItem>
                        <HiOutlineEye />
                        Detail
                      </DropdownMenuItem>
                    </Link>
                    <Link
                      to="/belanja/spp/$sppId/edit"
                      params={{ sppId: String(item.id) }}
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
          {spp.data.length === 0 && (
            <TableRow>
              <TableCell colSpan={100} className="text-center">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableCaption>
          Menampilkan data {formatAngka(spp.meta.pagination.firstRow)}-
          {formatAngka(spp.meta.pagination.lastRow)} dari{" "}
          {formatAngka(spp.meta.pagination.dataFiltered)}/
          {formatAngka(spp.meta.pagination.dataTotal)} data.
        </TableCaption>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (Number(spp.meta.pagination.page) > 1) {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page: String(Number(spp.meta.pagination.page) - 1),
                    }),
                  });
                }
              }}
            />
          </PaginationItem>
          <Select
            value={String(spp.meta.pagination.page)}
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
                  length: Number(spp.meta.pagination.pageCount),
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
                  Number(spp.meta.pagination.page) <
                  Number(spp.meta.pagination.pageCount)
                ) {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page: String(Number(spp.meta.pagination.page) + 1),
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