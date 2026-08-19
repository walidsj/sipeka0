import { createFileRoute } from "@tanstack/react-router";

import MonitoringTable from "@/features/anggaran/monitoring/realisasi-belanja/table";
import { TableBoundary } from "@/components/table-boundary";

function Page() {
  return (
    <TableBoundary>
      <MonitoringTable />
    </TableBoundary>
  );
}

export const Route = createFileRoute(
  "/_dashboard/anggaran/monitoring/realisasi-belanja/",
)({
  component: Page,
});
