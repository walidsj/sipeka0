import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {} from "@tanstack/react-router";
import { api } from "@/trpc/react";
import { Spinner } from "@/components/ui/spinner";

import { formatTanggal } from "@/lib/utils";
import BelanjaTable from "@/features/belanja/lpj-belanja/$lpjBelanjaId/tambah-belanja/table";
import { TableBoundary } from "@/components/table-boundary";

import NotFound from "@/components/not-found";
const routeApi = getRouteApi(
  "/_dashboard/belanja/lpj-belanja/$lpjBelanjaId/tambah-belanja/",
);

function EditPage() {
  const params = routeApi.useParams();

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

export const Route = createFileRoute(
  "/_dashboard/belanja/lpj-belanja/$lpjBelanjaId/tambah-belanja/",
)({
  component: EditPage,
});
