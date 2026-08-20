import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SpmRegisterTable from "@/features/belanja/spm/cetak/table";
import { TableBoundary } from "@/components/table-boundary";

function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cetak Register SPM</CardTitle>
        <CardDescription>Dokumen Register SPM siap cetak</CardDescription>
      </CardHeader>
      <CardContent>
        <TableBoundary>
          <SpmRegisterTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/belanja/spm/cetak/")({
  validateSearch: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
  component: Page,
});