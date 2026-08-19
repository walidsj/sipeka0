import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateForm from "@/features/lainnya/database/unit-kerja/tambah/form";

function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah Unit Kerja</CardTitle>
        <CardDescription>Form untuk menambah data unit kerja</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateForm />
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/lainnya/database/unit-kerja/tambah/",
)({
  component: Page,
});
