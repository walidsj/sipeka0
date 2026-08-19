import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateForm from "@/features/belanja/perekaman/tambah/form";

function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rekam Belanja Baru</CardTitle>
        <CardDescription>
          Form untuk rekam realisasi belanja baru
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CreateForm />
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/belanja/perekaman/tambah/")({
  component: Page,
});
