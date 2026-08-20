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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatAngka } from "@/lib/utils";
import { api } from "@/trpc/react";
import { keepPreviousData } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiChevronsDown, FiEdit, FiSearch, FiTrash } from "react-icons/fi";
import { Link, getRouteApi } from "@tanstack/react-router";
import { useDebounce } from "use-debounce";

const routeApi = getRouteApi("/_dashboard/lainnya/database/rekanan/");

export default function RekananTable() {
  const utils = api.useUtils();
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const [searchValue] = useDebounce(search["search"] ?? "", 300);

  const { data: rekanan } = api.rekanan.getAll.useQuery(
    {
      search: searchValue ?? "",
      page: Number(search["page"] ?? 1),
      pageSize: Number(search["pageSize"] ?? 10),
    },
    { placeholderData: keepPreviousData, suspense: true },
  );

  const deleteRekanan = api.rekanan.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.rekanan.invalidate();
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  if (!rekanan) {
    return <div>Data tidak dapat dimuat.</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center justify-end gap-5">
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1 text-center">No.</TableHead>
            <TableHead colSpan={1}>Nama Rekanan</TableHead>
            <TableHead className="text-center">Jenis</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">NPWP</TableHead>
            <TableHead className="w-1" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rekanan.data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="text-center">
                {formatAngka(rekanan.meta.pagination.firstRow + index)}.
              </TableCell>
              <TableCell>
                <p className="block font-semibold">{item.nama}</p>
                <span className="line-clamp-1 text-xs text-slate-500">
                  {item.alamat}
                </span>
              </TableCell>
              <TableCell className="text-center">{item.jenis}</TableCell>
              <TableCell className="text-center">
                <Badge
                  className={cn(
                    item.statusRekanan === "BIASA" && "bg-secondary",
                    item.statusRekanan === "MOU" && "bg-red-400",
                  )}
                >
                  {item.statusRekanan}
                </Badge>
              </TableCell>
              <TableCell className="text-center">{item.npwp}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Aksi <FiChevronsDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <Link
                      to="/lainnya/database/rekanan/$id/edit"
                      params={{ id: String(item.id) }}
                    >
                      <DropdownMenuItem>
                        <FiEdit />
                        Edit
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onClick={() => {
                        if (confirm("Apakah anda yakin menghapus data ini?")) {
                          deleteRekanan.mutate(item.id);
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
          {rekanan.data.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableCaption>
          Menampilkan data {formatAngka(rekanan.meta.pagination.firstRow)}-
          {formatAngka(rekanan.meta.pagination.lastRow)} dari{" "}
          {formatAngka(rekanan.meta.pagination.dataFiltered)}/
          {formatAngka(rekanan.meta.pagination.dataTotal)} data.
        </TableCaption>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (Number(rekanan.meta.pagination.page) > 1) {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page: String(Number(rekanan.meta.pagination.page) - 1),
                    }),
                  });
                }
              }}
            />
          </PaginationItem>
          <Select
            value={String(rekanan.meta.pagination.page)}
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
                  length: Number(rekanan.meta.pagination.pageCount),
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
                  Number(rekanan.meta.pagination.page) <
                  Number(rekanan.meta.pagination.pageCount)
                ) {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page: String(Number(rekanan.meta.pagination.page) + 1),
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