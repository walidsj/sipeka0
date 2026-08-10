import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "@/trpc/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { cn, formatAngka, formatTanggal } from "@/lib/utils";
import Loading from "@/components/loading";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FiChevronsDown,
  FiCopy,
  FiEdit,
  FiPlus,
  FiPrinter,
  FiTrash,
} from "react-icons/fi";
import toast from "react-hot-toast";
import PotonganTable from "./table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotFound from "@/app/not-found";

export default function EditPage() {
  const params = useParams<{ belanjaId: string }>();
  const utils = api.useUtils();
  const navigate = useNavigate();

  const {
    data: belanja,
    isError,
    isLoading,
  } = api.belanja.getById.useQuery(Number(params.belanjaId));

  const deleteBelanja = api.belanja.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      navigate(-1);
      utils.belanja.invalidate();
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  if (isLoading) return <Loading />;

  if (isError) return <NotFound />;

  if (!belanja) return <NotFound />;

  function handleCopy(text: string | null | undefined) {
    if (!text) return toast.error("Tidak ada data yang bisa di-copy");

    navigator.clipboard.writeText(text);

    toast.success(`"${text}" berhasil dicopy`);
  }

  const biayaAdmin =
    belanja.rekanan?.bank?.kode == "124" || belanja.pegawai?.bank?.kode == "124"
      ? 0
      : 2900;

  return (
    <Card>
      <div className="mb-5 flex flex-row items-center justify-between px-6 pt-6">
        <CardHeader className="p-0">
          <CardTitle>Detail Belanja</CardTitle>
          <CardDescription>Data untuk detail belanja</CardDescription>
        </CardHeader>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Aksi <FiChevronsDown className="ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <Link to="edit">
              <DropdownMenuItem>
                <FiEdit className="mr-2" />
                Edit
              </DropdownMenuItem>
            </Link>
            <Link to="cetak-kwitansi">
              <DropdownMenuItem>
                <FiPrinter className="mr-2" />
                Cetak Kwitansi
              </DropdownMenuItem>
            </Link>
            <Link to="cetak-amplop">
              <DropdownMenuItem>
                <FiPrinter className="mr-2" />
                Cetak Amplop
              </DropdownMenuItem>
            </Link>
            <Link to="cetak-daftar-potong">
              <DropdownMenuItem>
                <FiPrinter className="mr-2" />
                Cetak Daftar Potong
              </DropdownMenuItem>
            </Link>
            {belanja.metodePembayaran === "TRANSFER" && (
              <Link to="cetak-setoran-bank">
                <DropdownMenuItem>
                  <FiPrinter className="mr-2" />
                  Cetak Setoran Bank
                </DropdownMenuItem>
              </Link>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (confirm("Apakah anda yakin menghapus data ini?")) {
                  deleteBelanja.mutate(Number(params.belanjaId));
                }
              }}
              className="text-red-500"
            >
              <FiTrash className="mr-2" />
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableHead className="w-60">Kode Rekening</TableHead>
              <TableCell>
                <p>{belanja.rab?.kodeRekening}</p>
                <p className="text-sm text-slate-500">{belanja.rab?.uraian}</p>
              </TableCell>
              <TableCell className="w-1" />
            </TableRow>
            <TableRow>
              <TableHead>Nomor Dokumen</TableHead>
              <TableCell>{belanja.noDokumen}</TableCell>
              <TableCell>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={() => handleCopy(belanja.noDokumen)}
                >
                  <FiCopy />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Tanggal Dokumen</TableHead>
              <TableCell>{formatTanggal(belanja.tglDokumen)}</TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableHead>Uraian</TableHead>
              <TableCell>{belanja.uraian}</TableCell>
              <TableCell>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={() => handleCopy(belanja.uraian)}
                >
                  <FiCopy />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Jumlah</TableHead>
              <TableCell>{formatAngka(belanja.jumlah)}</TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableHead>Metode Pembayaran</TableHead>
              <TableCell>
                <Badge
                  className={cn(
                    belanja.metodePembayaran === "TUNAI" && "bg-green-500",
                    belanja.metodePembayaran === "TRANSFER" && "bg-blue-500",
                  )}
                >
                  {belanja.metodePembayaran}
                </Badge>
              </TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableHead>Bukti Pembayaran</TableHead>
              <TableCell>{belanja.buktiPembayaran}</TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardHeader>
        <CardTitle>Data Lawan Transaksi</CardTitle>
        <CardDescription>Rincian data lawan transaksi</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {belanja.rekanan && (
              <React.Fragment>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableCell>{belanja.rekanan.nama}</TableCell>
                  <TableCell className="w-1" />
                </TableRow>
                <TableRow>
                  <TableHead>NPWP</TableHead>
                  <TableCell>{belanja.rekanan.npwp}</TableCell>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => handleCopy(belanja.rekanan?.npwp)}
                    >
                      <FiCopy />
                    </Button>
                  </TableCell>
                </TableRow>
                {belanja.metodePembayaran === "TRANSFER" && (
                  <>
                    <TableRow>
                      <TableHead>Rekening Bank</TableHead>
                      <TableCell>
                        <p>{belanja.rekanan.bank?.nama}</p>
                        <p>{belanja.rekanan.bank?.kode}</p>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() =>
                            handleCopy(belanja.rekanan?.bank?.kode)
                          }
                        >
                          <FiCopy />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Nama di Rekening</TableHead>
                      <TableCell>{belanja.rekanan.namaRekening}</TableCell>
                      <TableCell>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() =>
                            handleCopy(belanja.rekanan?.namaRekening)
                          }
                        >
                          <FiCopy />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Nomor Rekening</TableHead>
                      <TableCell>{belanja.rekanan.noRekening}</TableCell>
                      <TableCell>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() =>
                            handleCopy(belanja.rekanan?.noRekening)
                          }
                        >
                          <FiCopy />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </React.Fragment>
            )}
            {belanja.pegawai && (
              <React.Fragment>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableCell>
                    {belanja.pegawai.gelarDepan &&
                      `${belanja.pegawai.gelarDepan} `}
                    {belanja.pegawai.nama}
                    {belanja.pegawai.gelarBelakang &&
                      `, ${belanja.pegawai.gelarBelakang}`}
                  </TableCell>
                  <TableCell className="w-1" />
                </TableRow>
                <TableRow>
                  <TableHead>NPWP</TableHead>
                  <TableCell>{belanja.pegawai?.npwp}</TableCell>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => handleCopy(belanja.pegawai?.npwp)}
                    >
                      <FiCopy />
                    </Button>
                  </TableCell>
                </TableRow>
                {belanja.metodePembayaran === "TRANSFER" && (
                  <>
                    <TableRow>
                      <TableHead>Rekening Bank</TableHead>
                      <TableCell>
                        <p>{belanja.pegawai.bank?.nama}</p>
                        <p>{belanja.pegawai.bank?.kode}</p>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() =>
                            handleCopy(belanja.pegawai?.bank?.kode)
                          }
                        >
                          <FiCopy />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Nama di Rekening</TableHead>
                      <TableCell>{belanja.pegawai.namaRekening}</TableCell>
                      <TableCell>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() =>
                            handleCopy(belanja.pegawai?.namaRekening)
                          }
                        >
                          <FiCopy />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Nomor Rekening</TableHead>
                      <TableCell>{belanja.pegawai.noRekening}</TableCell>
                      <TableCell>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() =>
                            handleCopy(belanja.pegawai?.noRekening)
                          }
                        >
                          <FiCopy />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </React.Fragment>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <div className="mb-5 flex flex-row items-center justify-between px-6 pt-6">
        <CardHeader className="p-0">
          <CardTitle>Potongan Belanja</CardTitle>
          <CardDescription>Daftar rincian potongan belanja</CardDescription>
        </CardHeader>
        <Button asChild>
          <Link to="potongan/tambah">
            <FiPlus className="mr-2" />
            Tambah
          </Link>
        </Button>
      </div>
      <CardContent>
        <PotonganTable />
      </CardContent>
      <CardHeader>
        <CardTitle>Realisasi Belanja</CardTitle>
        <CardDescription>Daftar rincian realisasi belanja</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableHead>Belanja yang Dibayarkan</TableHead>
              <TableCell className="text-right">
                {formatAngka(belanja.jumlah)}
              </TableCell>
              <TableCell className="w-1" />
            </TableRow>
            <TableRow>
              <TableHead>Jumlah Potongan</TableHead>
              <TableCell className="text-right">
                {formatAngka(
                  belanja.potonganBelanja.reduce(
                    (acc, item) => acc + Number(item.jumlah),
                    0,
                  ),
                )}
              </TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableHead>Jumlah Setelah Potongan</TableHead>
              <TableCell className="text-right">
                {formatAngka(
                  Number(belanja.jumlah) -
                    belanja.potonganBelanja.reduce(
                      (acc, item) => acc + Number(item.jumlah),
                      0,
                    ),
                )}
              </TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableHead>Biaya Admin Bank</TableHead>
              <TableCell className="text-right">
                {formatAngka(biayaAdmin)}
              </TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableHead>Jumlah Netto</TableHead>
              <TableCell className="text-right">
                {formatAngka(
                  Number(belanja.jumlah) -
                    belanja.potonganBelanja.reduce(
                      (acc, item) => acc + Number(item.jumlah),
                      0,
                    ) -
                    biayaAdmin,
                )}
              </TableCell>
              <TableCell>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={() =>
                    handleCopy(
                      String(
                        Number(belanja.jumlah) -
                          belanja.potonganBelanja.reduce(
                            (acc, item) => acc + Number(item.jumlah),
                            0,
                          ) -
                          biayaAdmin,
                      ),
                    )
                  }
                >
                  <FiCopy />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
