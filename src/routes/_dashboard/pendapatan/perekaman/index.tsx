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
import PendapatanTable from "@/features/pendapatan/perekaman/table";
import { TableBoundary } from "@/components/table-boundary";

import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { FiPlus } from "react-icons/fi";

function CreatePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Perekaman Pendapatan</CardTitle>
        <CardDescription>Data perekaman pendapatan</CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="/pendapatan/perekaman/tambah">
              <FiPlus />
              Tambah
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <TableBoundary>
          <PendapatanTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/pendapatan/perekaman/")({
  validateSearch: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    search: z.string().optional(),
    page: z.string().optional(),
    pageSize: z.string().optional(),
  }),
  component: CreatePage,
});
