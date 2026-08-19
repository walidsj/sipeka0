import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "@tanstack/react-router";
import EditForm from "@/features/lainnya/user/$id/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";

function EditUser() {
  const params = useParams({ strict: false }) as Record<string, string>;

  const user = api.user.getById.useQuery(parseInt(params.id!));

  if ((user.isSuccess && !user.data) || user.isError) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit User</CardTitle>
        <CardDescription>Form untuk mengedit data user</CardDescription>
      </CardHeader>
      <CardContent>
        {user.isSuccess && user.data && <EditForm data={user.data} />}
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/lainnya/user/_toolbox/$id/edit/",
)({
  component: EditUser,
});
