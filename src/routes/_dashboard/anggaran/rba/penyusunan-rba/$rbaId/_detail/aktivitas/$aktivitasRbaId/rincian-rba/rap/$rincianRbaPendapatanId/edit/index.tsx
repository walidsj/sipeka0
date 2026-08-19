import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import { CardDescription, CardTitle } from "@/components/ui/card";
import {} from "@tanstack/react-router";
import EditForm from "@/features/anggaran/rba/penyusunan-rba/$rbaId/aktivitas/$aktivitasRbaId/rincian-rba/rap/$rincianRbaPendapatanId/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";
const routeApi = getRouteApi(
  "/_dashboard/anggaran/rba/penyusunan-rba/$rbaId/_detail/aktivitas/$aktivitasRbaId/rincian-rba/rap/$rincianRbaPendapatanId/edit/",
);

function EditPage() {
  const params = routeApi.useParams();

  const rincianRba = api.rincianRbaPendapatan.getById.useQuery(
    parseInt(params.rincianRbaPendapatanId ?? ""),
  );

  if ((rincianRba.isSuccess && !rincianRba.data) || rincianRba.isError)
    return <NotFound />;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <CardTitle>Edit Rincian RBA</CardTitle>
        <CardDescription>Form untuk mengedit rincian rba</CardDescription>
      </div>
      {rincianRba.isSuccess && rincianRba.data && (
        <EditForm data={rincianRba.data} />
      )}
    </div>
  );
}

export const Route = createFileRoute(
  "/_dashboard/anggaran/rba/penyusunan-rba/$rbaId/_detail/aktivitas/$aktivitasRbaId/rincian-rba/rap/$rincianRbaPendapatanId/edit/",
)({
  component: EditPage,
});
