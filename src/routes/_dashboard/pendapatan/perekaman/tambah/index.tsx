import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateForm from "@/features/pendapatan/perekaman/tambah/form";

function CreatePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rekam Pendapatan Baru</CardTitle>
        <CardDescription>
          Form untuk rekam realisasi pendapatan baru
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CreateForm />
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/pendapatan/perekaman/tambah/",
)({
  component: CreatePage,
});
