import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {} from "@tanstack/react-router";
import EditForm from "@/features/belanja/sp2d/$sp2dId/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";
const routeApi = getRouteApi("/_dashboard/belanja/sp2d/$sp2dId/edit/");

function EditPage() {
  const params = routeApi.useParams();

  const sp2d = api.sp2d.getById.useQuery(parseInt(params.sp2dId!));

  if ((sp2d.isSuccess && !sp2d.data) || sp2d.isError) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Dokumen SP2D</CardTitle>
        <CardDescription>Form untuk mengedit dokumen</CardDescription>
      </CardHeader>
      <CardContent>
        {sp2d.isSuccess && sp2d.data && <EditForm data={sp2d.data} />}
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/belanja/sp2d/$sp2dId/edit/")({
  component: EditPage,
});
