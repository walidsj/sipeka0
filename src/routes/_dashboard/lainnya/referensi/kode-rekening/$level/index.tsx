import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { Spinner } from "@/components/ui/spinner";
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
import { FiSearch } from "react-icons/fi";
import { Navigate, getRouteApi } from "@tanstack/react-router";
import { useDebounce } from "use-debounce";

const routeApi = getRouteApi(
  "/_dashboard/lainnya/referensi/kode-rekening/$level/",
);

function Page() {
  const params = routeApi.useParams();
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const [searchValue] = useDebounce(search["search"] ?? "", 300);

  if (!["1", "2", "3", "4", "5", "6"].includes(params.level)) {
    return (
      <Navigate
        to="/lainnya/referensi/kode-rekening/$level"
        params={{ level: "1" }}
      />
    );
  }

  const {
    isLoading,
    isError,
    error,
    data: rekening,
  } = api.kodeRekening.getAll.useQuery(
    {
      level: (params.level ?? "1") as "1" | "2" | "3" | "4" | "5" | "6",
      search: searchValue,
      page: Number(search["page"] ?? 1),
      pageSize: Number(search["pageSize"] ?? 10),
    },
    { placeholderData: keepPreviousData },
  );

  if (isLoading) return <Spinner />;

  if (isError) return <div>{error.message}</div>;

  if (!rekening) return <div>Data tidak dapat dimuat.</div>;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
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
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch />
          </div>
          <Input
            className="w-80 pl-10"
            placeholder="Cari kode rekening"
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
            <TableHead className="w-40">Kode Rekening</TableHead>
            <TableHead>Uraian</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rekening.data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.kode}</TableCell>
              <TableCell>{item.uraian}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>
          Menampilkan data {formatAngka(rekening.meta.pagination.firstRow)}-
          {formatAngka(rekening.meta.pagination.lastRow)} dari{" "}
          {formatAngka(rekening.meta.pagination.dataFiltered)}/
          {formatAngka(rekening.meta.pagination.dataTotal)} data.
        </TableCaption>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (Number(rekening.meta.pagination.page) > 1) {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page: String(Number(rekening.meta.pagination.page) - 1),
                    }),
                  });
                }
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (
                  Number(rekening.meta.pagination.page) <
                  Number(rekening.meta.pagination.pageCount)
                ) {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page: String(Number(rekening.meta.pagination.page) + 1),
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

export const Route = createFileRoute(
  "/_dashboard/lainnya/referensi/kode-rekening/$level/",
)({
  validateSearch: z.object({
    search: z.string().optional(),
    page: z.string().optional(),
    pageSize: z.string().optional(),
  }),
  component: Page,
});
