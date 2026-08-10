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
  const params = useParams<{ lpjBelanjaId: string }>();

  const lpjBelanja = api.lpjBelanja.getById.useQuery(
    parseInt(params.lpjBelanjaId!),
  );

  if ((lpjBelanja.isSuccess && !lpjBelanja.data) || lpjBelanja.isError)
    return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Dokumen LPJ Belanja</CardTitle>
        <CardDescription>Form untuk mengedit dokumen</CardDescription>
      </CardHeader>
      <CardContent>
        {lpjBelanja.isSuccess && lpjBelanja.data && (
          <EditForm data={lpjBelanja.data} />
        )}
      </CardContent>
    </Card>
  );
}
