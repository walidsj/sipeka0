import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { cn, formatAngka } from "@/lib/utils";
import { api } from "@/trpc/react";
import { keepPreviousData } from "@tanstack/react-query";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  FiCheckCircle,
  FiChevronsDown,
  FiEdit,
  FiEye,
  FiFile,
  FiSearch,
  FiTrash,
  FiUploadCloud,
} from "react-icons/fi";
import { Link, getRouteApi } from "@tanstack/react-router";
import { useDebounce } from "use-debounce";

const routeApi = getRouteApi("/_dashboard/belanja/perekaman/");

export default function BelanjaTable() {
  const utils = api.useUtils();

  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const [searchValue] = useDebounce(search["search"] ?? "", 300);

  const { data: belanja } = api.belanja.getAll.useQuery(
    {
      search: searchValue ?? "",
      page: Number(search["page"] ?? 1),
      pageSize: Number(search["pageSize"] ?? 10),
      startDate: search["startDate"] || undefined,
      endDate: search["endDate"] || undefined,
    },
    { placeholderData: keepPreviousData, suspense: true },
  );

  const deleteBelanja = api.belanja.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.belanja.invalidate();
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  if (!belanja) {
    return <div>Data tidak dapat dimuat.</div>;
  }

  const totalBelanjaTable = belanja.data?.reduce(
    (acc, item) => acc + Number(item.jumlah),
    0,
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center gap-5">
        <Select
          value={search["pageSize"] ?? "10"}
          onValueChange={(val) => {
            navigate({
              search: (prev) => ({ ...prev, pageSize: val, page: "1" }),
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
        <div className="flex gap-2">
          <Input
            value={search["startDate"] ?? ""}
            type="date"
            onChange={(e) => {
              navigate({
                search: (prev) => ({
                  ...prev,
                  page: "1",
                  startDate: e.target.value,
                }),
              });
            }}
          />
          <Input
            type="date"
            value={search["endDate"] ?? ""}
            onChange={(e) => {
              navigate({
                search: (prev) => ({
                  ...prev,
                  page: "1",
                  endDate: e.target.value,
                }),
              });
            }}
          />
        </div>
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
            <TableHead>Tanggal Dokumen</TableHead>
            <TableHead>Nomor Dokumen</TableHead>
            <TableHead>Kode Rekening</TableHead>
            <TableHead>Uraian</TableHead>
            <TableHead className="text-center">Metode Pembayaran</TableHead>
            <TableHead className="text-right">Jumlah</TableHead>
            {search["showPotonganColumn"] && (
              <>
                <TableHead className="text-center">Potongan</TableHead>
                <TableHead className="text-center">Nett</TableHead>
              </>
            )}

            <TableHead className="w-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      showPotonganColumn: search["showPotonganColumn"]
                        ? ""
                        : "true",
                    }),
                  });
                }}
              >
                {search["showPotonganColumn"] ? (
                  <FaChevronLeft />
                ) : (
                  <FaChevronRight />
                )}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {belanja.data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">
                {formatAngka(belanja.meta.pagination.firstRow + index)}.
              </TableCell>
              <TableCell className="text-center">
                {format(item.tglDokumen!, "dd/MM/yyyy")}
              </TableCell>
              <TableCell className="text-center font-semibold">
                {item.noDokumen}{" "}
                {item.file && (
                  <FiCheckCircle className="inline text-green-500" />
                )}
              </TableCell>
              <TableCell>
                <p>{item.rab?.uraian}</p>
                <p className="text-xs text-slate-500">
                  {item.rab?.kodeRekening}
                </p>
                <p className="text-xs text-slate-500">
                  {item.rekening?.uraian}
                </p>
              </TableCell>
              <TableCell>
                <p>{item.uraian}</p>
                {item.rekanan && (
                  <p className="mt-3 text-xs text-slate-500">
                    {item.rekanan.nama}
                  </p>
                )}
                {item.pegawai && (
                  <p className="mt-3 text-xs text-slate-500">
                    {item.pegawai.gelarDepan && `${item.pegawai.gelarDepan} `}
                    {item.pegawai.nama}
                    {item.pegawai.gelarBelakang &&
                      `, ${item.pegawai.gelarBelakang}`}
                  </p>
                )}
              </TableCell>
              <TableCell className="text-center font-semibold">
                <Badge
                  className={cn(
                    item.metodePembayaran === "TRANSFER" && "bg-blue-500",
                  )}
                >
                  {item.metodePembayaran}
                </Badge>
                <p className="text-xs text-slate-500">{item.buktiPembayaran}</p>
              </TableCell>
              <TableCell
                className={cn(
                  "text-right font-semibold",
                  search["showPotonganColumn"] && "border-r",
                )}
              >
                {formatAngka(item.jumlah)}
              </TableCell>
              {search["showPotonganColumn"] && (
                <>
                  <TableCell className="p-0">
                    {item.potonganBelanja && (
                      <Table className="text-xs">
                        {item.potonganBelanja.map((potongan) => (
                          <TableRow key={potongan.id}>
                            <TableCell className="py-0 text-nowrap">
                              {potongan.jenis}
                            </TableCell>
                            <TableCell className="py-0 text-right">
                              {formatAngka(potongan.jumlah)}
                            </TableCell>
                          </TableRow>
                        ))}
                        {item.metodePembayaran === "TRANSFER" &&
                          ((item.rekanan &&
                            item.rekanan.bank?.kode !== "124") ||
                            (item.pegawai &&
                              item.pegawai.bank?.kode !== "124")) && (
                            <TableRow>
                              <TableCell className="py-0 text-nowrap">
                                Admin Bank
                              </TableCell>
                              <TableCell className="py-0 text-right">
                                {formatAngka(2_900)}
                              </TableCell>
                            </TableRow>
                          )}
                      </Table>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatAngka(
                      Number(item.jumlah) -
                        (item.potonganBelanja?.reduce(
                          (acc, item) => acc + Number(item.jumlah),
                          0,
                        ) ?? 0) -
                        (item.metodePembayaran === "TRANSFER" &&
                        ((item.rekanan && item.rekanan.bank?.kode !== "124") ||
                          (item.pegawai && item.pegawai.bank?.kode !== "124"))
                          ? 2_900
                          : 0),
                    )}
                  </TableCell>
                </>
              )}

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                      Aksi <FiChevronsDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <Link
                      to="/belanja/perekaman/$belanjaId"
                      params={{ belanjaId: String(item.id) }}
                    >
                      <DropdownMenuItem>
                        <FiEye />
                        Detail
                      </DropdownMenuItem>
                    </Link>
                    <Link
                      to="/belanja/perekaman/$belanjaId/edit"
                      params={{ belanjaId: String(item.id) }}
                    >
                      <DropdownMenuItem>
                        <FiEdit />
                        Edit
                      </DropdownMenuItem>
                    </Link>
                    {item.file && (
                      <a
                        href={`/api/storage/files/belanja/` + item.file}
                        target="_blank"
                      >
                        <DropdownMenuItem>
                          <FiFile />
                          Lihat File
                        </DropdownMenuItem>
                      </a>
                    )}
                    <DropdownMenuSeparator />
                    <Link
                      to="/belanja/perekaman/$belanjaId/upload"
                      params={{ belanjaId: String(item.id) }}
                    >
                      <DropdownMenuItem>
                        <FiUploadCloud />
                        Upload File
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        if (confirm("Apakah anda yakin menghapus data ini?")) {
                          deleteBelanja.mutate(item.id);
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
          {belanja.data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={search["showPotonganColumn"] ? 11 : 9}
                className="text-center"
              >
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>Total</TableCell>
            <TableCell
              className={cn(
                "text-right",
                search["showPotonganColumn"] && "border-r",
              )}
            >
              {formatAngka(totalBelanjaTable)}
            </TableCell>
            <TableCell />
            {search["showPotonganColumn"] && (
              <>
                <TableCell />
                <TableCell />
              </>
            )}
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>Total Keseluruhan</TableCell>
            <TableCell
              className={cn(
                "text-right",
                search["showPotonganColumn"] && "border-r",
              )}
            >
              {formatAngka(belanja.totalSum)}
            </TableCell>
            <TableCell />
            {search["showPotonganColumn"] && (
              <>
                <TableCell />
                <TableCell />
              </>
            )}
          </TableRow>
        </TableFooter>
        <TableCaption>
          Menampilkan data {formatAngka(belanja.meta.pagination.firstRow)}-
          {formatAngka(belanja.meta.pagination.lastRow)} dari{" "}
          {formatAngka(belanja.meta.pagination.dataFiltered)}/
          {formatAngka(belanja.meta.pagination.dataTotal)} data.
        </TableCaption>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (Number(belanja.meta.pagination.page) > 1) {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page: String(Number(belanja.meta.pagination.page) - 1),
                    }),
                  });
                }
              }}
            />
          </PaginationItem>
          <Select
            value={String(belanja.meta.pagination.page)}
            onValueChange={(val) => {
              navigate({
                search: (prev) => ({ ...prev, page: val }),
              });
            }}
          >
            <SelectTrigger className="w-20 font-semibold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                {
                  length: Number(belanja.meta.pagination.pageCount),
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
                  Number(belanja.meta.pagination.page) <
                  Number(belanja.meta.pagination.pageCount)
                ) {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page: String(Number(belanja.meta.pagination.page) + 1),
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
