import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {} from "@tanstack/react-router";
import CreateForm from "@/features/belanja/perekaman/$belanjaId/potongan/tambah/form";
import { api } from "@/trpc/react";
import { formatAngka, formatTanggal } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import NotFound from "@/components/not-found";
const routeApi = getRouteApi(
  "/_dashboard/belanja/perekaman/$belanjaId/potongan/tambah/",
);

function EditPage() {
  const params = routeApi.useParams();

  const belanja = api.belanja.getById.useQuery(Number(params.belanjaId));

  if ((belanja.isSuccess && !belanja.data) || belanja.isError)
    return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah Potongan Belanja</CardTitle>
        <CardDescription>
          Form untuk tambah potongan realisasi belanja
        </CardDescription>
      </CardHeader>
      {belanja.data && (
        <CardContent>
          <div className="flex flex-row items-center gap-4">
            <img src="/images/icons/research.png" className="h-16" />
            <div>
              <CardTitle>{belanja.data.noDokumen}</CardTitle>
              <CardDescription>
                tanggal {formatTanggal(belanja.data.tglDokumen)}
              </CardDescription>
              <CardDescription className="font-semibold">
                {belanja.data.uraian}
              </CardDescription>
              <Badge>Rp {formatAngka(belanja.data.jumlah)}</Badge>
            </div>
          </div>
        </CardContent>
      )}

      <CardContent>
        <CreateForm />
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/belanja/perekaman/$belanjaId/potongan/tambah/",
)({
  component: EditPage,
});
