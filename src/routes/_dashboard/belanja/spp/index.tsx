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
import SppTable from "@/features/belanja/spp/table";
import { TableBoundary } from "@/components/table-boundary";

function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SPP Belanja</CardTitle>
        <CardDescription>
          Daftar SPP Belanja Bendahara Pengeluaran BLUD RSJD Atma Husada Mahakam
        </CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="/belanja/spp/tambah">
              <HiOutlinePlus />
              Tambah
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <TableBoundary>
          <SppTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/belanja/spp/")({
  validateSearch: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
  component: Page,
});
