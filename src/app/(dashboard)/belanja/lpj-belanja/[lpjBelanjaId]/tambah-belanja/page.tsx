import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { api } from "@/trpc/react";
import { Spinner } from "@/components/ui/spinner";

import { formatTanggal } from "@/lib/utils";
import BelanjaTable from "./table";import { TableBoundary } from "@/components/table-boundary";

import NotFound from "@/app/not-found";

export default function EditPage() {
  const params = useParams<{ lpjBelanjaId: string }>();

  const {
    data: lpjBelanja,
    isError,
    isLoading,
  } = api.lpjBelanja.getById.useQuery(Number(params.lpjBelanjaId));

  if (isLoading) return <Spinner />;

  if (isError) return <NotFound />;

  if (!lpjBelanja) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambahkan Belanja ke LPJ Belanja</CardTitle>
        <CardDescription>Data untuk detail daftar belanja</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-4">
          <img src="/images/icons/research.png" className="h-16" />
          <div>
            <CardDescription>Dokumen LPJ Belanja</CardDescription>
            <CardTitle>{lpjBelanja.noDokumen}</CardTitle>
            <CardDescription>
              tanggal {formatTanggal(lpjBelanja.tglDokumen)}
            </CardDescription>
            <CardDescription>{lpjBelanja.uraian}</CardDescription>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <TableBoundary>
        <BelanjaTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}
