import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateForm from "@/features/lainnya/database/rekanan/tambah/form";

function CreatePegawai() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah Pegawai</CardTitle>
        <CardDescription>Form untuk menambah data pegawai</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateForm />
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/lainnya/database/rekanan/tambah/",
)({
  component: CreatePegawai,
});
