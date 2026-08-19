import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "@tanstack/react-router";
import EditForm from "@/features/lainnya/database/bank/$id/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";

function EditBank() {
  const params = useParams({ strict: false }) as Record<string, string>;

  const bank = api.bank.getById.useQuery(parseInt(params.id!));

  if ((bank.isSuccess && !bank.data) || bank.isError) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Bank</CardTitle>
        <CardDescription>Form untuk mengedit data bank</CardDescription>
      </CardHeader>
      <CardContent>
        {bank.isSuccess && bank.data && <EditForm data={bank.data} />}
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/lainnya/database/bank/$id/edit/",
)({
  component: EditBank,
});
