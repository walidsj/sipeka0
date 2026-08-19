import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "@tanstack/react-router";
import EditForm from "@/features/anggaran/rba/penyusunan-rba/$rbaId/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";

function EditPage() {
  const params = useParams({ strict: false }) as Record<string, string>;

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
