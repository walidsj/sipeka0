import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {} from "@tanstack/react-router";
import EditForm from "@/features/lainnya/database/rekanan/$id/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";
const routeApi = getRouteApi("/_dashboard/lainnya/database/rekanan/$id/edit/");

function EditRekanan() {
  const params = routeApi.useParams();

  const rekanan = api.rekanan.getById.useQuery(parseInt(params.id!));

  if ((rekanan.isSuccess && !rekanan.data) || rekanan.isError)
    return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Rekanan</CardTitle>
        <CardDescription>Form untuk mengedit data rekanan</CardDescription>
      </CardHeader>
      <CardContent>
        {rekanan.isSuccess && rekanan.data && <EditForm data={rekanan.data} />}
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/lainnya/database/rekanan/$id/edit/",
)({
  component: EditRekanan,
});
