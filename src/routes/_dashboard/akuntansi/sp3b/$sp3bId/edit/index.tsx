import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {} from "@tanstack/react-router";
import EditForm from "@/features/akuntansi/sp3b/$sp3bId/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";
const routeApi = getRouteApi("/_dashboard/akuntansi/sp3b/$sp3bId/edit/");

function EditPage() {
  const params = routeApi.useParams();

  const sp3b = api.sp3b.getById.useQuery(parseInt(params.sp3bId!));

  if ((sp3b.isSuccess && !sp3b.data) || sp3b.isError) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Dokumen SP3B</CardTitle>
        <CardDescription>Form untuk mengedit dokumen</CardDescription>
      </CardHeader>
      <CardContent>
        {sp3b.isSuccess && sp3b.data && <EditForm data={sp3b.data} />}
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/akuntansi/sp3b/$sp3bId/edit/",
)({
  component: EditPage,
});
