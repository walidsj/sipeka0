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

import NotFound from "@/components/not-found";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatTanggal } from "@/lib/utils";

function EditPage() {
  const params = useParams({ strict: false }) as Record<string, string>;

  const {
    data: spm,
    isError,
    isLoading,
  } = api.spm.getById.useQuery(Number(params.spmId));

  if (isLoading) return <Spinner />;

  if (isError) return <NotFound />;

  if (!spm) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detail SPM</CardTitle>
        <CardDescription>Data untuk detail SPM</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-4">
          <img src="/images/icons/research.png" className="h-16" />
          <div>
            <CardDescription>Dokumen SPM</CardDescription>
            <CardTitle>{spm.noDokumen}</CardTitle>
            <CardDescription>
              tanggal {formatTanggal(spm.tglDokumen)}
            </CardDescription>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableHead>
                Surat Pernyataan Tanggung Jawab Mutlak (SPTJM)
              </TableHead>
              <TableCell>
                <Button asChild>
                  <Link
                    to="/belanja/spm/$spmId/cetak-sptjm"
                    params={{ spmId: params.spmId }}
                  >
                    Lihat
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Surat Perintah Membayar (SPM)</TableHead>
              <TableCell>
                <Button asChild>
                  <Link
                    to="/belanja/spm/$spmId/cetak-spm"
                    params={{ spmId: params.spmId }}
                  >
                    Lihat
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Surat Pernyataan Verifikasi</TableHead>
              <TableCell>
                <Button asChild>
                  <Link
                    to="/belanja/spm/$spmId/cetak-pernyataan-verifikasi"
                    params={{ spmId: params.spmId }}
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

export const Route = createFileRoute("/_dashboard/belanja/spm/$spmId/")({
  component: EditPage,
});
