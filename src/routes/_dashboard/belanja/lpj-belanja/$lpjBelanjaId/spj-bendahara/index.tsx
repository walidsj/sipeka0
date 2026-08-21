import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SpjBendaharaTable from "@/features/belanja/lpj-belanja/spj-bendahara/table";

function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SPJ Bendahara</CardTitle>
        <CardDescription>Surat Pertanggungjawaban Bendahara Pengeluaran</CardDescription>
      </CardHeader>
      <CardContent>
        <SpjBendaharaTable />
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/belanja/lpj-belanja/$lpjBelanjaId/spj-bendahara/",
)({
  validateSearch: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
  component: Page,
});
