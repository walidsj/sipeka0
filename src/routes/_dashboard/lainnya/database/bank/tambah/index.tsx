import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateForm from "@/features/lainnya/database/bank/tambah/form";

function CreateBank() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah Bank</CardTitle>
        <CardDescription>Form untuk menambah data bank</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateForm />
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/lainnya/database/bank/tambah/",
)({
  component: CreateBank,
});
