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
import { Link } from "@tanstack/react-router";
import { HiOutlinePlus } from "react-icons/hi";
import SpmTable from "@/features/belanja/sp2d/table";
import { TableBoundary } from "@/components/table-boundary";

function Page() {
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
            <Link to="/belanja/sp2d/tambah">
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

export const Route = createFileRoute("/_dashboard/belanja/sp2d/")({
  component: Page,
});
