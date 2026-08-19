import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import { CardDescription, CardTitle } from "@/components/ui/card";
import {} from "@tanstack/react-router";
import EditForm from "@/features/anggaran/rba/penyusunan-rba/$rbaId/aktivitas/$aktivitasRbaId/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";
const routeApi = getRouteApi(
  "/_dashboard/anggaran/rba/penyusunan-rba/$rbaId/_detail/aktivitas/$aktivitasRbaId/edit/",
);

function EditPage() {
  const params = routeApi.useParams();

  const aktivitasRba = api.aktivitasRba.getById.useQuery(
    parseInt(params.aktivitasRbaId ?? ""),
  );

  if ((aktivitasRba.isSuccess && !aktivitasRba.data) || aktivitasRba.isError)
    return <NotFound />;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <CardTitle>Edit Aktivitas</CardTitle>
        <CardDescription>Form untuk mengedit aktivitas rba</CardDescription>
      </div>
      {aktivitasRba.isSuccess && aktivitasRba.data && (
        <EditForm data={aktivitasRba.data} />
      )}
    </div>
  );
}

export const Route = createFileRoute(
  "/_dashboard/anggaran/rba/penyusunan-rba/$rbaId/_detail/aktivitas/$aktivitasRbaId/edit/",
)({
  component: EditPage,
});
