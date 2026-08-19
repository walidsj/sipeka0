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

function Page() {
  const params = useParams({ strict: false }) as Record<string, string>;

  const {
    data: sp2d,
    isError,
    isLoading,
  } = api.sp2d.getById.useQuery(Number(params.sp2dId));

  if (isLoading) return <Spinner />;

  if (isError) return <NotFound />;

  if (!sp2d) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detail SP2D</CardTitle>
        <CardDescription>Data untuk detail SP2D</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-4">
          <img src="/images/icons/research.png" className="h-16" />
          <div>
            <CardDescription>Dokumen SP2D</CardDescription>
            <CardTitle>{sp2d.noDokumen}</CardTitle>
            <CardDescription>
              tanggal {formatTanggal(sp2d.tglDokumen)}
            </CardDescription>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableHead>Lembar Kendali Permintaan Cek</TableHead>
              <TableCell>
                <Button asChild>
                  <Link
                    to="/belanja/sp2d/$sp2dId/cetak-kendali-cek"
                    params={{ sp2dId: params.sp2dId }}
                  >
                    Lihat
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Surat Perintah Pencairan Dana (SP2D)</TableHead>
              <TableCell>
                <Button asChild>
                  <Link
                    to="/belanja/sp2d/$sp2dId/cetak-sp2d"
                    params={{ sp2dId: params.sp2dId }}
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

export const Route = createFileRoute("/_dashboard/belanja/sp2d/$sp2dId/")({
  component: Page,
});
