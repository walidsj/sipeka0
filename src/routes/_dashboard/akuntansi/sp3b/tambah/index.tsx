import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateForm from "@/features/akuntansi/sp3b/tambah/form";

function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buat Dokumen SP3B</CardTitle>
        <CardDescription>Form untuk menambah dokumen baru</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateForm />
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/akuntansi/sp3b/tambah/")({
  component: Page,
});
