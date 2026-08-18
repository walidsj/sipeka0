import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BkuTable from "./table";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buku Kas Umum</CardTitle>
        <CardDescription>Buku Kas Umum Bendahara Pengeluaran</CardDescription>
      </CardHeader>
      <CardContent>
        <BkuTable />
      </CardContent>
    </Card>
  );
}
