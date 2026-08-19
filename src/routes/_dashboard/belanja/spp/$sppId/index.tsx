import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
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
const routeApi = getRouteApi("/_dashboard/belanja/spp/$sppId/");

function EditPage() {
  const params = routeApi.useParams();

  const {
    data: spp,
    isError,
    isLoading,
  } = api.spp.getById.useQuery(Number(params.sppId));

  if (isLoading) return <Spinner />;

  if (isError) return <NotFound />;

  if (!spp) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detail SPP</CardTitle>
        <CardDescription>Data untuk detail SPP</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-4">
          <img src="/images/icons/research.png" className="h-16" />
          <div>
            <CardDescription>Dokumen SPP</CardDescription>
            <CardTitle>{spp.noDokumen}</CardTitle>
            <CardDescription>
              tanggal {formatTanggal(spp.tglDokumen)}
            </CardDescription>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableHead>Surat Pengantar</TableHead>
              <TableCell>
                <Button asChild>
                  <Link
                    to="/belanja/spp/$sppId/cetak-surat-pengantar"
                    params={{ sppId: params.sppId }}
                  >
                    Lihat
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Surat Permintaan Pembayaran (SPP)</TableHead>
              <TableCell>
                <Button asChild>
                  <Link
                    to="/belanja/spp/$sppId/cetak-spp"
                    params={{ sppId: params.sppId }}
                  >
                    Lihat
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Surat Permintaan Pembayaran (SPP) Rincian</TableHead>
              <TableCell>
                <Button asChild>
                  <Link
                    to="/belanja/spp/$sppId/cetak-spp-rincian"
                    params={{ sppId: params.sppId }}
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

export const Route = createFileRoute("/_dashboard/belanja/spp/$sppId/")({
  component: EditPage,
});
