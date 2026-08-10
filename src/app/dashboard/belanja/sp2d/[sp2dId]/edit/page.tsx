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
  const params = useParams<{ sp2dId: string }>();

  const sp2d = api.sp2d.getById.useQuery(parseInt(params.sp2dId!));

  if ((sp2d.isSuccess && !sp2d.data) || sp2d.isError) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Dokumen SP2D</CardTitle>
        <CardDescription>Form untuk mengedit dokumen</CardDescription>
      </CardHeader>
      <CardContent>
        {sp2d.isSuccess && sp2d.data && <EditForm data={sp2d.data} />}
      </CardContent>
    </Card>
  );
}
