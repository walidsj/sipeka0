import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateForm from "@/features/anggaran/rba/penyusunan-rba/tambah/form";

function CreatePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buat Dokumen RBA</CardTitle>
        <CardDescription>Form untuk persiapan penyusunan RBA</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateForm />
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/anggaran/rba/penyusunan-rba/tambah/",
)({
  component: CreatePage,
});
