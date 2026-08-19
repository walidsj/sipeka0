import { createFileRoute } from "@tanstack/react-router";

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
import { Link, useSearch } from "@tanstack/react-router";

function Page() {
  const search = useSearch({ strict: false }) as Record<string, string>;
  const searchObj: Record<string, string> = { ...search };

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
              <Link
                to="/belanja/buku/buku-pajak/cetak"
                search={searchObj as never}
              >
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
  component: Page,
});
