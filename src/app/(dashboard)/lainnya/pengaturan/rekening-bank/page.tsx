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
import { Link } from "react-router-dom";
import RekeningBankTable from "./table";
import { TableBoundary } from "@/components/table-boundary";

export default function PengelolaBlud() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rekening Bank</CardTitle>
        <CardDescription>Daftar Rekening Bank BLUD</CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="tambah">
              <FiPlus className="mr-2" />
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
