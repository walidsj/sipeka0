import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "@tanstack/react-router";
import EditForm from "@/features/akuntansi/rekening-koran/$rekeningBankId/$rekeningKoranId/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";

function EditPage() {
  const params = useParams({ strict: false }) as Record<string, string>;

  const rekeningKoran = api.rekeningKoran.getById.useQuery(
    Number(params.rekeningKoranId),
  );

  if ((rekeningKoran.isSuccess && !rekeningKoran.data) || rekeningKoran.isError)
    return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Rekening Koran</CardTitle>
        <CardDescription>Form untuk edit data</CardDescription>
      </CardHeader>
      <CardContent>
        {rekeningKoran.isSuccess && rekeningKoran.data && (
          <EditForm data={rekeningKoran.data} />
        )}
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/akuntansi/rekening-koran/$rekeningBankId/$rekeningKoranId/edit/",
)({
  component: EditPage,
});
