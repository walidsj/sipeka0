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
import LpjBelanjaTable from "@/features/belanja/lpj-belanja/table";
import { TableBoundary } from "@/components/table-boundary";

import { HiOutlinePlus } from "react-icons/hi";

function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>LPJ Belanja</CardTitle>
        <CardDescription>
          Daftar LPJ Belanja Bendahara Pengeluaran BLUD RSJD Atma Husada Mahakam
        </CardDescription>

        <CardAction>
          <Button asChild>
            <Link to="/belanja/lpj-belanja/tambah">
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

export const Route = createFileRoute("/_dashboard/belanja/lpj-belanja/")({
  validateSearch: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    search: z.string().optional(),
    page: z.string().optional(),
    pageSize: z.string().optional(),
  }),
  component: Page,
});
