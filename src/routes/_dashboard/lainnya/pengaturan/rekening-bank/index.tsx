import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FiPlus } from "react-icons/fi";
import { Link } from "@tanstack/react-router";
import RekeningBankTable from "@/features/lainnya/pengaturan/rekening-bank/table";
import { TableBoundary } from "@/components/table-boundary";

function PengelolaBlud() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rekening Bank</CardTitle>
        <CardDescription>Daftar Rekening Bank BLUD</CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="/lainnya/pengaturan/rekening-bank/tambah">
              <FiPlus />
              Tambah
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <TableBoundary>
          <RekeningBankTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/lainnya/pengaturan/rekening-bank/",
)({
  component: PengelolaBlud,
});
