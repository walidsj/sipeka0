import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "@tanstack/react-router";
import EditForm from "@/features/lainnya/database/pegawai/$id/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";

function EditPegawai() {
  const params = useParams({ strict: false }) as Record<string, string>;

  const pegawai = api.pegawai.getById.useQuery(parseInt(params.id!));

  if ((pegawai.isSuccess && !pegawai.data) || pegawai.isError)
    return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Pegawai</CardTitle>
        <CardDescription>Form untuk mengedit data pegawai</CardDescription>
      </CardHeader>
      <CardContent>
        {pegawai.isSuccess && pegawai.data && <EditForm data={pegawai.data} />}
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/lainnya/database/pegawai/$id/edit/",
)({
  component: EditPegawai,
});
