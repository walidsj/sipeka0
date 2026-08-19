import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BkuTable from "./table";
import { TableBoundary } from "@/components/table-boundary";

export default function Page() {
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
