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

export default function EditBank() {
  const params = useParams<{ id: string }>();

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
