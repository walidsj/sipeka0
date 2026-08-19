import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DetailTable from "@/features/anggaran/monitoring/realisasi-belanja/$rincianRbaBelanjaId/detail-belanja/table";
import { TableBoundary } from "@/components/table-boundary";

function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rincian Belanja</CardTitle>
        <CardDescription>Daftar belanja terealisasi</CardDescription>
      </CardHeader>
      <CardContent>
        <TableBoundary>
          <DetailTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/anggaran/monitoring/realisasi-belanja/$rincianRbaBelanjaId/detail-belanja/",
)({
  component: Page,
});
