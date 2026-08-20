import { Badge } from "@/components/ui/badge";
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

const routeApi = getRouteApi("/_dashboard/belanja/lpj-belanja/");

export default function LpjBelanjaTable() {
  const utils = api.useUtils();
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const [searchValue] = useDebounce(search.search ?? "", 300);

  const { user } = useAuth();
  const tahun = user?.tahun ?? "2026";
  const startDate = search.startDate || defaultDateRange(tahun).startDate;
  const endDate = search.endDate || defaultDateRange(tahun).endDate;

  const { data: lpjBelanja } = api.lpjBelanja.getAll.useQuery(
    {
      search: searchValue ?? "",
      startDate,
      endDate,
      page: Number(search.page ?? 1),
      pageSize: Number(search.pageSize ?? 10),
    },
    { suspense: true, placeholderData: keepPreviousData },
  );

  const deleteItem = api.lpjBelanja.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.lpjBelanja.invalidate();
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  if (!lpjBelanja) return <div>Data tidak dapat dimuat.</div>;

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
            <TableHead>Uraian</TableHead>
            <TableHead className="text-center">Jenis</TableHead>
            <TableHead className="text-right">Jumlah</TableHead>
            <TableHead className="w-1" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {lpjBelanja.data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">
                {formatAngka(lpjBelanja.meta.pagination.firstRow + index)}.
              </TableCell>
              <TableCell className="text-center">
                {format(item.tglDokumen!, "dd/MM/yyyy")}
              </TableCell>
              <TableCell className="text-center font-semibold">
                {item.noDokumen}
              </TableCell>
              <TableCell>{item.uraian}</TableCell>
              <TableCell className="text-center">
                {item.jenis === "GU" && <Badge>GU</Badge>}
                {item.jenis === "LS" && (
                  <Badge className="bg-green-500">LS</Badge>
                )}
                {item.jenis === "TU" && (
                  <Badge className="bg-yellow-500">TU</Badge>
                )}
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
                      to="/belanja/lpj-belanja/$lpjBelanjaId"
                      params={{ lpjBelanjaId: String(item.id) }}
                    >
                      <DropdownMenuItem>
                        <HiOutlineEye />
                        Detail
                      </DropdownMenuItem>
                    </Link>
                    <Link
                      to="/belanja/lpj-belanja/$lpjBelanjaId/edit"
                      params={{ lpjBelanjaId: String(item.id) }}
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
          {lpjBelanja.data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableHead colSpan={5} className="text-center">
              Total
            </TableHead>
            <TableHead>
              {formatAngka(
                lpjBelanja.data.reduce(
                  (acc, curr) => acc + Number(curr.jumlah),
                  0,
                ),
              )}
            </TableHead>
            <TableHead />
          </TableRow>
        </TableFooter>
        <TableCaption>
          Menampilkan data {formatAngka(lpjBelanja.meta.pagination.firstRow)}-
          {formatAngka(lpjBelanja.meta.pagination.lastRow)} dari{" "}
          {formatAngka(lpjBelanja.meta.pagination.dataFiltered)}/
          {formatAngka(lpjBelanja.meta.pagination.dataTotal)} data.
        </TableCaption>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (Number(lpjBelanja.meta.pagination.page) > 1) {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page: String(
                        Number(lpjBelanja.meta.pagination.page) - 1,
                      ),
                    }),
                  });
                }
              }}
            />
          </PaginationItem>
          <Select
            value={String(lpjBelanja.meta.pagination.page)}
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
                  length: Number(lpjBelanja.meta.pagination.pageCount),
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
                  Number(lpjBelanja.meta.pagination.page) <
                  Number(lpjBelanja.meta.pagination.pageCount)
                ) {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page: String(
                        Number(lpjBelanja.meta.pagination.page) + 1,
                      ),
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