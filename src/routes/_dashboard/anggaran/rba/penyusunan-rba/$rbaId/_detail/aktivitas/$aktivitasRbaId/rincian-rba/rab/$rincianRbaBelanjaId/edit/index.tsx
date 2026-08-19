import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import { CardDescription, CardTitle } from "@/components/ui/card";
import {} from "@tanstack/react-router";
import EditForm from "@/features/anggaran/rba/penyusunan-rba/$rbaId/aktivitas/$aktivitasRbaId/rincian-rba/rab/$rincianRbaBelanjaId/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";
const routeApi = getRouteApi(
  "/_dashboard/anggaran/rba/penyusunan-rba/$rbaId/_detail/aktivitas/$aktivitasRbaId/rincian-rba/rab/$rincianRbaBelanjaId/edit/",
);

function EditPage() {
  const params = routeApi.useParams();

  const rincianRbaBelanja = api.rincianRbaBelanja.getById.useQuery(
    parseInt(params.rincianRbaBelanjaId ?? ""),
  );

  if (
    (rincianRbaBelanja.isSuccess && !rincianRbaBelanja.data) ||
    rincianRbaBelanja.isError
  )
    return <NotFound />;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <CardTitle>Edit Rincian RBA</CardTitle>
        <CardDescription>Form untuk mengedit rincian rba</CardDescription>
      </div>
      {rincianRbaBelanja.isSuccess && rincianRbaBelanja.data && (
        <EditForm data={rincianRbaBelanja.data} />
      )}
    </div>
  );
}

export const Route = createFileRoute(
  "/_dashboard/anggaran/rba/penyusunan-rba/$rbaId/_detail/aktivitas/$aktivitasRbaId/rincian-rba/rab/$rincianRbaBelanjaId/edit/",
)({
  component: EditPage,
});
