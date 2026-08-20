import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

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
import SpmTable from "@/features/belanja/spm/table";
import { TableBoundary } from "@/components/table-boundary";

function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SPM Belanja</CardTitle>
        <CardDescription>
          Daftar SPM Belanja Bendahara Pengeluaran BLUD RSJD Atma Husada Mahakam
        </CardDescription>
        <CardAction>
          <Button asChild variant="outline">
            <Link to="/belanja/spm/cetak">Cetak Register</Link>
          </Button>
          <Button asChild>
            <Link to="/belanja/spm/tambah">
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

export const Route = createFileRoute("/_dashboard/belanja/spm/")({
  validateSearch: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
  component: Page,
});
