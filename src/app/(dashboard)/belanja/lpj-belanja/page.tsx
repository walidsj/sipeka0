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
import LpjBelanjaTable from "./table";import { TableBoundary } from "@/components/table-boundary";

import { HiOutlinePlus } from "react-icons/hi";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>LPJ Belanja</CardTitle>
        <CardDescription>
          Daftar LPJ Belanja Bendahara Pengeluaran BLUD RSJD Atma Husada Mahakam
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
        <LpjBelanjaTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}
