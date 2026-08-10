import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BkPajakTable from "./table";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cetak Buku Pembantu Pajak</CardTitle>
        <CardDescription>
          Dokumen Buku Pembantu Pajak siap cetak
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BkPajakTable />
      </CardContent>
    </Card>
  );
}
