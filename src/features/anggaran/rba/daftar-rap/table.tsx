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
import { keepPreviousData } from "@tanstack/react-query";
import _ from "lodash";
import React from "react";
import toast from "react-hot-toast";
import { FiChevronsDown, FiEdit, FiSearch, FiTrash } from "react-icons/fi";
import { Link, getRouteApi } from "@tanstack/react-router";
import { useDebounce } from "use-debounce";

const routeApi = getRouteApi("/_dashboard/anggaran/rba/daftar-rap/");

export default function RapTable() {
  const utils = api.useUtils();
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const [searchValue] = useDebounce(search.search ?? "", 300);

  const rap = api.rap.getAll.useQuery(
    {
      search: searchValue ?? "",
      page: Number(search.page ?? 1),
      pageSize: Number(search.pageSize ?? 10),
    },
    { placeholderData: keepPreviousData, suspense: true },
  );

  const deleteRap = api.rap.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.rap.invalidate();
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  const groupedData = _.chain(rap.data?.data)
    .groupBy((item) => `${item.kodeRekening}||${item.uraianRekening}`)
    .value();

  if (!rap.data) return <div>Data tidak dapat dimuat.</div>;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center justify-end gap-5">
        <Select
          value={search.pageSize ?? "10"}
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1 text-center">No.</TableHead>
            <TableHead colSpan={1}>Uraian</TableHead>
            <TableHead className="w-1" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rap.isSuccess &&
            groupedData &&
            Object.keys(groupedData).map((key) => (
              <React.Fragment key={key}>
                <TableRow>
                  <TableCell colSpan={3}>
                    <span className="mr-3 inline-block font-bold">
                      {key.split("||")[0]}
                    </span>
                    <span className="font-semibold">{key.split("||")[1]}</span>
                  </TableCell>
                </TableRow>
                {groupedData[key].map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{index + 1}.</TableCell>
                    <TableCell className="font-semibold">
                      {item.uraian}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            Aksi <FiChevronsDown />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <Link
                            to="/anggaran/rba/daftar-rap/$rapId/edit"
                            params={{ rapId: String(item.id) }}
                          >
                            <DropdownMenuItem>
                              <FiEdit />
                              Edit
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem
                            onClick={() => {
                              if (
                                confirm("Apakah anda yakin menghapus data ini?")
                              ) {
                                deleteRap.mutate(item.id);
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
              </React.Fragment>
            ))}
          {rap.isSuccess && rap.data?.data.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableCaption>
          Menampilkan data {formatAngka(rap.data.meta.pagination.firstRow)}-
          {formatAngka(rap.data.meta.pagination.lastRow)} dari{" "}
          {formatAngka(rap.data.meta.pagination.dataFiltered)}/
          {formatAngka(rap.data.meta.pagination.dataTotal)} data.
        </TableCaption>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (Number(rap.data.meta.pagination.page) > 1) {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page: String(Number(rap.data.meta.pagination.page) - 1),
                    }),
                  });
                }
              }}
            />
          </PaginationItem>
          <Select
            value={String(rap.data.meta.pagination.page)}
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
                  length: Number(rap.data.meta.pagination.pageCount),
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
                  Number(rap.data.meta.pagination.page) <
                  Number(rap.data.meta.pagination.pageCount)
                ) {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page: String(Number(rap.data.meta.pagination.page) + 1),
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