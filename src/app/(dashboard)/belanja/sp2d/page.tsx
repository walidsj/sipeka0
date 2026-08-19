import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi";
import SpmTable from "./table";
import { TableBoundary } from "@/components/table-boundary";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SP2D Belanja</CardTitle>
        <CardDescription>
          Daftar SP2D Belanja Bendahara Pengeluaran BLUD RSJD Atma Husada
          Mahakam
        </CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="tambah">
              <HiOutlinePlus />
              Tambah
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <TableBoundary>
        <SpmTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}
