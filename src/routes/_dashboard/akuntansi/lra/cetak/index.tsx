import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BkPajakTable from "@/features/akuntansi/lra/cetak/table";
import { TableBoundary } from "@/components/table-boundary";

function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cetak Buku Pembantu Pajak</CardTitle>
        <CardDescription>
          Dokumen Buku Pembantu Pajak siap cetak
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TableBoundary>
          <BkPajakTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/akuntansi/lra/cetak/")({
  component: Page,
});
