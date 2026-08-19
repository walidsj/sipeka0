import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {} from "@tanstack/react-router";
import EditForm from "@/features/anggaran/rba/daftar-rap/$rapId/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";
const routeApi = getRouteApi(
  "/_dashboard/anggaran/rba/daftar-rap/$rapId/edit/",
);

function EditPage() {
  const params = routeApi.useParams();

  const rap = api.rap.getById.useQuery(parseInt(params.rapId ?? ""));

  if ((rap.isSuccess && !rap.data) || rap.isError) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Item Daftar RAP</CardTitle>
        <CardDescription>Form untuk mengedit aktivitas rba</CardDescription>
      </CardHeader>
      <CardContent>
        {rap.isSuccess && rap.data && <EditForm data={rap.data} />}
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/anggaran/rba/daftar-rap/$rapId/edit/",
)({
  component: EditPage,
});
