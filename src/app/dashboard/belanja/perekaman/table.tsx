import Loading from "@/components/loading";
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
import { Link, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";

export default function BelanjaTable() {
  const utils = api.useUtils();

  const [searchParams, setSearchParams] = useSearchParams({
    search: "",
    page: "1",
    pageSize: "10",
    startDate: "",
    endDate: "",
    showPotonganColumn: "",
  });

  const [searchValue] = useDebounce(searchParams.get("search") ?? "", 300);

  const {
    isLoading,
    isError,
    error,
    data: belanja,
  } = api.belanja.getAll.useQuery(
    {
      search: searchValue ?? "",
      page: Number(searchParams.get("page") ?? 1),
      pageSize: Number(searchParams.get("pageSize") ?? 10),
      startDate: searchParams.get("startDate")
        ? new Date(searchParams.get("startDate")!)
        : undefined,
      endDate: searchParams.get("endDate")
        ? new Date(searchParams.get("endDate")!)
        : undefined,
    },
    { placeholderData: keepPreviousData },
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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

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
          value={searchParams.get("pageSize") ?? "10"}
          onValueChange={(val) => {
            searchParams.set("pageSize", val);
            searchParams.set("page", "1");
            setSearchParams(searchParams);
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
            value={searchParams.get("startDate") ?? ""}
            type="date"
            onChange={(e) => {
              searchParams.set("page", "1");
              searchParams.set("startDate", e.target.value);
              setSearchParams(searchParams);
            }}
          />
          <Input
            type="date"
            value={searchParams.get("endDate") ?? ""}
            onChange={(e) => {
              searchParams.set("page", "1");
              searchParams.set("endDate", e.target.value);
              setSearchParams(searchParams);
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
            value={searchParams.get("search") ?? ""}
            onChange={(e) => {
              searchParams.set("search", e.target.value);
              searchParams.set("page", "1");
              setSearchParams(searchParams);
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
            {searchParams.get("showPotonganColumn") && (
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
                  searchParams.set(
                    "showPotonganColumn",
                    searchParams.get("showPotonganColumn") ? "" : "true",
                  );
                  setSearchParams(searchParams);
                }}
              >
                {searchParams.get("showPotonganColumn") ? (
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
                    <img
                      src="/images/icons/shop.png"
                      alt="rekanan"
                      className="mr-1 inline h-4 w-4"
                    />
                    {item.rekanan.nama}
                  </p>
                )}
                {item.pegawai && (
                  <p className="mt-3 text-xs text-slate-500">
                    {item.pegawai.jenisKelamin && (
                      <img
                        src={
                          item.pegawai.jenisKelamin === "PEREMPUAN"
                            ? "/images/icons/woman.png"
                            : "/images/icons/man.png"
                        }
                        alt="pegawai"
                        className="mr-1 inline h-4 w-4"
                      />
                    )}
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
                  searchParams.get("showPotonganColumn") && "border-r",
                )}
              >
                {formatAngka(item.jumlah)}
              </TableCell>
              {searchParams.get("showPotonganColumn") && (
                <>
                  <TableCell>
                    {item.potonganBelanja && (
                      <Table className="text-xs">
                        {item.potonganBelanja.map((potongan) => (
                          <TableRow key={potongan.id} className="font-semibold">
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
                    <Link to={`${item.id}`}>
                      <DropdownMenuItem>
                        <FiEye />
                        Detail
                      </DropdownMenuItem>
                    </Link>
                    <Link to={`${item.id}/edit`}>
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
                    <Link to={`${item.id}/upload`}>
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
                colSpan={searchParams.get("showPotonganColumn") ? 11 : 9}
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
                searchParams.get("showPotonganColumn") && "border-r",
              )}
            >
              {formatAngka(totalBelanjaTable)}
            </TableCell>
            <TableCell />
            {searchParams.get("showPotonganColumn") && (
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
                searchParams.get("showPotonganColumn") && "border-r",
              )}
            >
              {formatAngka(belanja.totalSum)}
            </TableCell>
            <TableCell />
            {searchParams.get("showPotonganColumn") && (
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
              disabled={Number(belanja.meta.pagination.page) === 1}
              onClick={() => {
                Number(belanja.meta.pagination.page) > 1 &&
                  searchParams.set(
                    "page",
                    String(Number(belanja.meta.pagination.page) - 1),
                  );
                setSearchParams(searchParams);
              }}
            />
          </PaginationItem>
          <Select
            value={String(belanja.meta.pagination.page) ?? "1"}
            onValueChange={(val) => {
              searchParams.set("page", val);
              setSearchParams(searchParams);
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
              disabled={
                Number(belanja.meta.pagination.page) ===
                Number(belanja.meta.pagination.pageCount)
              }
              onClick={() => {
                Number(belanja.meta.pagination.page) <
                  Number(belanja.meta.pagination.pageCount) &&
                  searchParams.set(
                    "page",
                    String(Number(belanja.meta.pagination.page) + 1),
                  );
                setSearchParams(searchParams);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
