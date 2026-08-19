import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateForm from "@/features/anggaran/rba/daftar-rap/tambah/form";

function CreatePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah Item Daftar RAP</CardTitle>
        <CardDescription>Form untuk persiapan penyusunan RBA</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateForm />
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/anggaran/rba/daftar-rap/tambah/",
)({
  component: CreatePage,
});
