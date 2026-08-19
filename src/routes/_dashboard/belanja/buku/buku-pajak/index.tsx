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
import BkPajakTable from "@/features/belanja/buku/buku-pajak/table";
import { TableBoundary } from "@/components/table-boundary";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HiOutlineChevronDoubleDown, HiOutlinePrinter } from "react-icons/hi";
import { Link, getRouteApi } from "@tanstack/react-router";

const routeApi = getRouteApi("/_dashboard/belanja/buku/buku-pajak/");

function Page() {
  const search = routeApi.useSearch();
  const searchObj = { ...search };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buku Pembantu Pajak</CardTitle>
        <CardDescription>
          Daftar penerimaan dan penyetoran pajak yang telah dibuat
        </CardDescription>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Aksi <HiOutlineChevronDoubleDown className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <Link to="/belanja/buku/buku-pajak/cetak" search={searchObj}>
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
          <BkPajakTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/belanja/buku/buku-pajak/")({
  validateSearch: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
  component: Page,
});
