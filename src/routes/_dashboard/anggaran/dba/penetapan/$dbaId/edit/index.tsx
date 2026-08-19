import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navigate } from "@tanstack/react-router";
import EditForm from "@/features/anggaran/dba/penetapan/$dbaId/edit/form";
import { api } from "@/trpc/react";
const routeApi = getRouteApi("/_dashboard/anggaran/dba/penetapan/$dbaId/edit/");

function EditPage() {
  const params = routeApi.useParams();

  const dba = api.dba.getById.useQuery(parseInt(params.dbaId!));

  if ((dba.isSuccess && !dba.data) || dba.isError)
    return <Navigate to="/anggaran/dba/penetapan" replace />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit DBA</CardTitle>
        <CardDescription>Form untuk mengedit dba</CardDescription>
      </CardHeader>
      <CardContent>
        {dba.isSuccess && dba.data && <EditForm data={dba.data} />}
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/anggaran/dba/penetapan/$dbaId/edit/",
)({
  component: EditPage,
});
