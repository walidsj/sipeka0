import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "@tanstack/react-router";
import EditForm from "@/features/anggaran/rba/daftar-rab/$rabId/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";

function EditPage() {
  const params = useParams({ strict: false }) as Record<string, string>;

  const rab = api.rab.getById.useQuery(parseInt(params.rabId ?? ""));

  if ((rab.isSuccess && !rab.data) || rab.isError) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Item Daftar RAB</CardTitle>
        <CardDescription>Form untuk mengedit aktivitas rba</CardDescription>
      </CardHeader>
      <CardContent>
        {rab.isSuccess && rab.data && <EditForm data={rab.data} />}
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/anggaran/rba/daftar-rab/$rabId/edit/",
)({
  component: EditPage,
});
