import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BkuTable from "@/features/belanja/buku/kas-umum/table";
import { TableBoundary } from "@/components/table-boundary";

function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buku Kas Umum</CardTitle>
        <CardDescription>Buku Kas Umum Bendahara Pengeluaran</CardDescription>
      </CardHeader>
      <CardContent>
        <TableBoundary>
          <BkuTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/belanja/buku/kas-umum/")({
  validateSearch: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
  component: Page,
});
