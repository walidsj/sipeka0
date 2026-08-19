import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {} from "@tanstack/react-router";
import EditForm from "@/features/belanja/spm/$spmId/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";
const routeApi = getRouteApi("/_dashboard/belanja/spm/$spmId/edit/");

function EditPage() {
  const params = routeApi.useParams();

  const spm = api.spm.getById.useQuery(parseInt(params.spmId!));

  if ((spm.isSuccess && !spm.data) || spm.isError) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Dokumen SPM</CardTitle>
        <CardDescription>Form untuk mengedit dokumen</CardDescription>
      </CardHeader>
      <CardContent>
        {spm.isSuccess && spm.data && <EditForm data={spm.data} />}
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/belanja/spm/$spmId/edit/")({
  component: EditPage,
});
