import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import RabTable from "./table";import { TableBoundary } from "@/components/table-boundary";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Rencana Pendapatan</CardTitle>
        <CardDescription>
          Rencana Anggaran Pendapatan sesuai dengan ketentuan
        </CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="tambah">
              <FiPlus />
              Tambah
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <TableBoundary>
        <RabTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}
