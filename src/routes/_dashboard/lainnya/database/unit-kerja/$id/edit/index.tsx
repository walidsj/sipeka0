import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {} from "@tanstack/react-router";
import EditForm from "@/features/lainnya/database/unit-kerja/$id/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";
const routeApi = getRouteApi(
  "/_dashboard/lainnya/database/unit-kerja/$id/edit/",
);

function Page() {
  const params = routeApi.useParams();

  const unitKerja = api.unitKerja.getById.useQuery(parseInt(params.id!));

  if ((unitKerja.isSuccess && !unitKerja.data) || unitKerja.isError)
    return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Unit Kerja</CardTitle>
        <CardDescription>Form untuk mengedit data unit kerja</CardDescription>
      </CardHeader>
      <CardContent>
        {unitKerja.isSuccess && unitKerja.data && (
          <EditForm data={unitKerja.data} />
        )}
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/lainnya/database/unit-kerja/$id/edit/",
)({
  component: Page,
});
