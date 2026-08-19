import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "@tanstack/react-router";
import EditForm from "@/features/belanja/spp/$sppId/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";

function EditPage() {
  const params = useParams({ strict: false }) as Record<string, string>;

  const spp = api.spp.getById.useQuery(parseInt(params.sppId!));

  if ((spp.isSuccess && !spp.data) || spp.isError) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Dokumen SPP</CardTitle>
        <CardDescription>Form untuk mengedit dokumen</CardDescription>
      </CardHeader>
      <CardContent>
        {spp.isSuccess && spp.data && <EditForm data={spp.data} />}
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/belanja/spp/$sppId/edit/")({
  component: EditPage,
});
