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
import { FiPlus } from "react-icons/fi";
import { Link } from "@tanstack/react-router";
import PegawaiTable from "@/features/lainnya/database/pegawai/table";
import { TableBoundary } from "@/components/table-boundary";

function Pegawai() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Pegawai</CardTitle>
        <CardDescription>Daftar pegawai yang terdaftar di BLUD</CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="/lainnya/database/pegawai/tambah">
              <FiPlus />
              Tambah
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <TableBoundary>
          <PegawaiTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/lainnya/database/pegawai/")({
  validateSearch: z.object({
    search: z.string().optional(),
    page: z.string().optional(),
    pageSize: z.string().optional(),
  }),
  component: Pegawai,
});
