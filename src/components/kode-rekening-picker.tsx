import { FiCode, FiSearch } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { cn, formatAngka } from "@/lib/utils";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { keepPreviousData } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { useSearch, useNavigate } from "@tanstack/react-router";
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

export default function KodeRekeningPicker({
  value,
  onValueChange,
  defaultValue,
  params,
}: {
  value?: string | undefined;
  onValueChange?: (value: string | undefined) => void;
  defaultValue?: string;
  params?: { searchKode: string };
}) {
  const [selected, setSelected] = React.useState<string | undefined>(
    value ?? defaultValue ?? "",
  );

  const kodeRekeningSelected = api.kodeRekening.getByKode.useQuery(
    { kode: selected!, level: "6" },
    { enabled: !!selected, placeholderData: keepPreviousData },
  );

  const search = useSearch({ strict: false }) as Record<string, string>;
  const navigate = useNavigate();
  const [searchValue] = useDebounce(search["search"] ?? "", 300);

  const [level] = React.useState<"1" | "2" | "3" | "4" | "5" | "6">("6");

  const {
    isLoading,
    isError,
    error,
    data: rekening,
  } = api.kodeRekening.getAll.useQuery(
    {
      searchKode: params?.searchKode,
      level: level,
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "w-full justify-start bg-slate-100 text-sm font-normal",
            selected && "h-auto min-h-12",
          )}
        >
          {selected !== undefined && (
            <div>
              {kodeRekeningSelected.isSuccess && kodeRekeningSelected.data && (
                <div className="flex items-center gap-3">
                  <FiCode className="text-primary h-5 w-5" />
                  <div className="flex flex-col text-left">
                    <span className="line-clamp-1">
                      {kodeRekeningSelected.data.kode}
                    </span>
                    <span className="line-clamp-1 text-xs text-slate-500">
                      {kodeRekeningSelected.data.uraian}
                    </span>
                  </div>
                </div>
              )}
              {kodeRekeningSelected.isLoading && (
                <div className="flex items-center gap-3">
                  <Spinner />
                </div>
              )}
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Pilih Kode Rekening</DialogTitle>
          <DialogDescription>Data referensi kode rekening</DialogDescription>
        </DialogHeader>
        <div className="flex gap-5">
          <Select
            value={search["pageSize"] ?? "10"}
            onValueChange={(val) => {
              navigate({
                search: (prev) =>
                  ({
                    ...(prev as Record<string, string>),
                    pageSize: val,
                    page: "1",
                  }) as never,
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
              onChange={(e) =>
                navigate({
                  search: (prev) =>
                    ({
                      ...(prev as Record<string, string>),
                      search: e.target.value,
                    }) as never,
                })
              }
            />
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1">No.</TableHead>
                <TableHead>Kode Rekening</TableHead>
                <TableHead>Uraian</TableHead>
                <TableHead className="w-1">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rekening.data?.map((item, index) => (
                <TableRow
                  key={index}
                  className={cn(
                    selected === item.kode &&
                      "bg-yellow-100 hover:bg-yellow-200",
                  )}
                >
                  <TableCell className="text-center">
                    {formatAngka(rekening.meta.pagination.firstRow + index)}.
                  </TableCell>
                  <TableCell>{item.kode}</TableCell>
                  <TableCell>{item.uraian}</TableCell>
                  <TableCell>
                    {selected === item.kode ? (
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setSelected(undefined);
                          onValueChange?.(undefined);
                        }}
                      >
                        Batal
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelected(item.kode);
                          onValueChange?.(item.kode);
                        }}
                      >
                        Pilih
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {rekening.data?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableCaption>
              Menampilkan data {formatAngka(rekening.meta.pagination.firstRow)}-
              {formatAngka(rekening.meta.pagination.lastRow)} dari{" "}
              {formatAngka(rekening.meta.pagination.dataFiltered)}/
              {formatAngka(rekening.meta.pagination.dataTotal)} data.
            </TableCaption>
          </Table>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={Number(rekening.meta.pagination.page) === 1}
                onClick={() => {
                  if (Number(rekening.meta.pagination.page) > 1) {
                    navigate({
                      search: (prev) =>
                        ({
                          ...(prev as Record<string, string>),
                          page: String(
                            Number(rekening.meta.pagination.page) - 1,
                          ),
                        }) as never,
                    });
                  }
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                disabled={
                  Number(rekening.meta.pagination.page) ===
                  Number(rekening.meta.pagination.pageCount)
                }
                onClick={() => {
                  if (
                    Number(rekening.meta.pagination.page) <
                    Number(rekening.meta.pagination.pageCount)
                  ) {
                    navigate({
                      search: (prev) =>
                        ({
                          ...(prev as Record<string, string>),
                          page: String(
                            Number(rekening.meta.pagination.page) + 1,
                          ),
                        }) as never,
                    });
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </DialogContent>
    </Dialog>
  );
}
