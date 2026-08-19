import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useParams } from "@tanstack/react-router";
import { api } from "@/trpc/react";
import { Spinner } from "@/components/ui/spinner";
import { formatAngkaDecimal, formatTanggal } from "@/lib/utils";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import NotFound from "@/components/not-found";

function Page() {
  const params = useParams({ strict: false }) as Record<string, string>;

  const {
    data: sp3b,
    isError,
    isLoading,
  } = api.sp3b.getById.useQuery(Number(params.sp3bId));

  const { data: saldoAkhirRekeningBankPenerimaan } =
    api.rekeningKoran.getSaldoByDate.useQuery(
      {
        tglTransaksi: sp3b?.tglSelesai ?? format(new Date(), "yyyy-MM-dd"),
        rekeningBankId: 1,
      },
      {
        enabled: !!sp3b,
      },
    );

  const { data: saldoAkhirRekeningBankPengeluaran } =
    api.rekeningKoran.getSaldoByDate.useQuery(
      {
        tglTransaksi: sp3b?.tglSelesai ?? format(new Date(), "yyyy-MM-dd"),
        rekeningBankId: 2,
      },
      {
        enabled: !!sp3b,
      },
    );

  if (isLoading) return <Spinner />;

  if (isError) return <NotFound />;

  if (!sp3b) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detail SP3B</CardTitle>
        <CardDescription>
          Data untuk detail Surat Perintah Pengesahan Pendapatan dan Belanja
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-4">
          <img src="/images/icons/research.png" className="h-16" />
          <div>
            <CardDescription>Dokumen SP3B</CardDescription>
            <CardTitle>{sp3b.noDokumen}</CardTitle>
            <CardDescription>
              tanggal {formatTanggal(sp3b.tglDokumen)}
            </CardDescription>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <Table className="text-xs">
          <TableBody>
            <TableRow>
              <TableHead>Periode</TableHead>
              <TableCell className="text-right">
                {formatTanggal(sp3b.tglMulai)} -{" "}
                {formatTanggal(sp3b.tglSelesai)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Saldo Bank Bendahara Penerimaan</TableHead>
              <TableCell className="text-right">
                {formatAngkaDecimal(
                  saldoAkhirRekeningBankPenerimaan?.saldo ?? 0,
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Saldo SP3B</TableHead>
              <TableCell className="text-right">
                {formatAngkaDecimal(
                  sp3b.saldoAwal +
                    sp3b.pendapatan.total -
                    (sp3b.belanja.pegawai +
                      sp3b.belanja.barjas +
                      sp3b.belanja.modal),
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Selisih Saldo</TableHead>
              <TableCell className="text-right">
                {formatAngkaDecimal(
                  (saldoAkhirRekeningBankPenerimaan?.saldo ?? 0) -
                    sp3b.saldoAwal +
                    sp3b.pendapatan.total -
                    (sp3b.belanja.pegawai +
                      sp3b.belanja.barjas +
                      sp3b.belanja.modal),
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Saldo Bank Bendahara Pengeluaran</TableHead>
              <TableCell className="text-right">
                {formatAngkaDecimal(
                  saldoAkhirRekeningBankPengeluaran?.saldo ?? 0,
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Kas Bendahara Pengeluaran</TableHead>
              <TableCell className="text-right">
                {formatAngkaDecimal(
                  (saldoAkhirRekeningBankPenerimaan?.saldo ?? 0) -
                    sp3b.saldoAwal +
                    sp3b.pendapatan.total -
                    (sp3b.belanja.pegawai +
                      sp3b.belanja.barjas +
                      sp3b.belanja.modal) -
                    (saldoAkhirRekeningBankPengeluaran?.saldo ?? 0),
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableHead>Surat Pengantar</TableHead>
              <TableCell>
                <Button asChild>
                  <Link
                    to="/akuntansi/sp3b/$sp3bId/cetak-surat-pengantar"
                    params={{ sp3bId: params.sp3bId }}
                  >
                    Lihat
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>
                Surat Pernyataan Tanggung Jawab (SPTJB) - Belanja
              </TableHead>
              <TableCell>
                <Button asChild>
                  <Link
                    to="/akuntansi/sp3b/$sp3bId/cetak-sptjb-belanja"
                    params={{ sp3bId: params.sp3bId }}
                  >
                    Lihat
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>
                Surat Pernyataan Tanggung Jawab (SPTJB) - Pendapatan
              </TableHead>
              <TableCell>
                <Button asChild>
                  <Link
                    to="/akuntansi/sp3b/$sp3bId/cetak-sptjb-pendapatan"
                    params={{ sp3bId: params.sp3bId }}
                  >
                    Lihat
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>SP3B</TableHead>
              <TableCell>
                <Button asChild>
                  <Link
                    to="/akuntansi/sp3b/$sp3bId/cetak-sp3b"
                    params={{ sp3bId: params.sp3bId }}
                  >
                    Lihat
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/akuntansi/sp3b/$sp3bId/")({
  component: Page,
});
