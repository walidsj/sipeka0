import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {} from "@tanstack/react-router";
import EditForm from "@/features/anggaran/rba/penyusunan-rba/$rbaId/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";
const routeApi = getRouteApi(
  "/_dashboard/anggaran/rba/penyusunan-rba/$rbaId/edit/",
);

function EditPage() {
  const params = routeApi.useParams();

  const rba = api.rba.getById.useQuery(parseInt(params.rbaId!));

  if ((rba.isSuccess && !rba.data) || rba.isError) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit RBA</CardTitle>
        <CardDescription>Form untuk mengedit rba</CardDescription>
      </CardHeader>
      <CardContent>
        {rba.isSuccess && rba.data && <EditForm data={rba.data} />}
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/anggaran/rba/penyusunan-rba/$rbaId/edit/",
)({
  component: EditPage,
});
