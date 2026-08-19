import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {} from "@tanstack/react-router";
import EditForm from "@/features/belanja/lpj-belanja/$lpjBelanjaId/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";
const routeApi = getRouteApi(
  "/_dashboard/belanja/lpj-belanja/$lpjBelanjaId/edit/",
);

function EditPage() {
  const params = routeApi.useParams();

  const lpjBelanja = api.lpjBelanja.getById.useQuery(
    parseInt(params.lpjBelanjaId!),
  );

  if ((lpjBelanja.isSuccess && !lpjBelanja.data) || lpjBelanja.isError)
    return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Dokumen LPJ Belanja</CardTitle>
        <CardDescription>Form untuk mengedit dokumen</CardDescription>
      </CardHeader>
      <CardContent>
        {lpjBelanja.isSuccess && lpjBelanja.data && (
          <EditForm data={lpjBelanja.data} />
        )}
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/belanja/lpj-belanja/$lpjBelanjaId/edit/",
)({
  component: EditPage,
});
