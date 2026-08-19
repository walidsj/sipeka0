import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateForm from "@/features/anggaran/dba/penetapan/tambah/form";

function CreatePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buat Dokumen RKA</CardTitle>
        <CardDescription>Form untuk pembuatan dokumen RKA</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateForm />
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/anggaran/dba/penetapan/tambah/",
)({
  component: CreatePage,
});
