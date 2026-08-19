import MonitoringTable from "./table";
import { TableBoundary } from "@/components/table-boundary";

export default function Page() {
  return (
    <TableBoundary>
      <MonitoringTable />
    </TableBoundary>
  );
}
