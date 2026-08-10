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
  const params = useParams<{ rekeningKoranId: string }>();

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
