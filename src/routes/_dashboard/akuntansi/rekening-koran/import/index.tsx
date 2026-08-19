import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateForm from "@/features/akuntansi/rekening-koran/import/form";

function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Data Rekening Koran</CardTitle>
        <CardDescription>
          Import data CSV Rekening Koran dari CMS BPD KALTIMTARA
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CreateForm />
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/akuntansi/rekening-koran/import/",
)({
  component: Page,
});
