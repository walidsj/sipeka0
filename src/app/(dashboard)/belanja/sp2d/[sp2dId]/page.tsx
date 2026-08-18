import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { api } from "@/trpc/react";
import Loading from "@/components/loading";

import NotFound from "@/app/not-found";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatTanggal } from "@/lib/utils";

export default function Page() {
  const params = useParams<{ sp2dId: string }>();

  const {
    data: sp2d,
    isError,
    isLoading,
  } = api.sp2d.getById.useQuery(Number(params.sp2dId));

  if (isLoading) return <Loading />;

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
                  <Link to={`cetak-kendali-cek`}>Lihat</Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Surat Perintah Pencairan Dana (SP2D)</TableHead>
              <TableCell>
                <Button asChild>
                  <Link to={`cetak-sp2d`}>Lihat</Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
