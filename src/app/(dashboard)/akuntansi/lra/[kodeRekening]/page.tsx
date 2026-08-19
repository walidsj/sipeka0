import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DetailTable from "./table";
import { TableBoundary } from "@/components/table-boundary";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rincian Realisasi</CardTitle>
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
