import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SppRegisterTable from "@/features/belanja/spp/cetak/table";
import { TableBoundary } from "@/components/table-boundary";

function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cetak Register SPP</CardTitle>
        <CardDescription>Dokumen Register SPP siap cetak</CardDescription>
      </CardHeader>
      <CardContent>
        <TableBoundary>
          <SppRegisterTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/belanja/spp/cetak/")({
  validateSearch: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
  component: Page,
});