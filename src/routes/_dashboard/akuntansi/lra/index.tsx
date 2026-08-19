import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HiOutlineChevronDoubleDown, HiOutlinePrinter } from "react-icons/hi";
import { Link } from "@tanstack/react-router";
import LraTable from "@/features/akuntansi/lra/table";
import { TableBoundary } from "@/components/table-boundary";

function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Laporan Realisasi Anggaran</CardTitle>
        <CardDescription>Data laporan realisasi anggaran</CardDescription>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Aksi <HiOutlineChevronDoubleDown className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <Link to="/akuntansi/lra/cetak">
                <DropdownMenuItem>
                  <HiOutlinePrinter className="mr-2" />
                  Cetak
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent>
        <TableBoundary>
          <LraTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/akuntansi/lra/")({
  validateSearch: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
  component: Page,
});
