import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {} from "@tanstack/react-router";
import EditForm from "@/features/belanja/perekaman/$belanjaId/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";
const routeApi = getRouteApi("/_dashboard/belanja/perekaman/$belanjaId/edit/");

function EditPage() {
  const params = routeApi.useParams();

  const belanja = api.belanja.getById.useQuery(Number(params.belanjaId));

  if ((belanja.isSuccess && !belanja.data) || belanja.isError)
    return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Rekam Belanja</CardTitle>
        <CardDescription>
          Form untuk edit rekam realisasi belanja
        </CardDescription>
      </CardHeader>
      <CardContent>
        {belanja.isSuccess && belanja.data && <EditForm data={belanja.data} />}
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/belanja/perekaman/$belanjaId/edit/",
)({
  component: EditPage,
});
