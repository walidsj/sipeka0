import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "react-router-dom";
import EditForm from "./form";
import { api } from "@/trpc/react";
import NotFound from "@/app/not-found";

export default function EditPage() {
  const params = useParams<{ sppId: string }>();

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
