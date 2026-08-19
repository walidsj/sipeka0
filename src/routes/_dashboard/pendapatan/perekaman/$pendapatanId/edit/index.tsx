import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {} from "@tanstack/react-router";
import EditForm from "@/features/pendapatan/perekaman/$pendapatanId/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";
const routeApi = getRouteApi(
  "/_dashboard/pendapatan/perekaman/$pendapatanId/edit/",
);

function EditPage() {
  const params = routeApi.useParams();

  const pendapatan = api.pendapatan.getById.useQuery(
    parseInt(params.pendapatanId ?? ""),
  );

  if ((pendapatan.isSuccess && !pendapatan.data) || pendapatan.isError)
    return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Rekam Pendapatan</CardTitle>
        <CardDescription>
          Form untuk edit rekam realisasi pendapatan
        </CardDescription>
      </CardHeader>
      <CardContent>
        {pendapatan.isSuccess && pendapatan.data && (
          <EditForm data={pendapatan.data} />
        )}
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/pendapatan/perekaman/$pendapatanId/edit/",
)({
  component: EditPage,
});
