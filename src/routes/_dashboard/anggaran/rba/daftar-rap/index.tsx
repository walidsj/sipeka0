import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { Link } from "@tanstack/react-router";
import RabTable from "@/features/anggaran/rba/daftar-rap/table";
import { TableBoundary } from "@/components/table-boundary";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Rencana Pendapatan</CardTitle>
        <CardDescription>
          Rencana Anggaran Pendapatan sesuai dengan ketentuan
        </CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="/anggaran/rba/daftar-rap/tambah">
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

export const Route = createFileRoute("/_dashboard/anggaran/rba/daftar-rap/")({
  validateSearch: z.object({
    search: z.string().optional(),
    page: z.string().optional(),
    pageSize: z.string().optional(),
  }),
  component: Page,
});
