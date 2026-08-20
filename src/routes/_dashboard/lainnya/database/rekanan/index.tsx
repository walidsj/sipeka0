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
import RekananTable from "@/features/lainnya/database/rekanan/table";
import { TableBoundary } from "@/components/table-boundary";

function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Rekanan</CardTitle>
        <CardDescription>
          Daftar rekanan yang bertransaksi dengan BLUD
        </CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="/lainnya/database/rekanan/tambah">
              <FiPlus />
              Tambah
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <TableBoundary>
          <RekananTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/lainnya/database/rekanan/")({
  validateSearch: z.object({
    search: z.string().optional(),
    page: z.string().optional(),
    pageSize: z.string().optional(),
  }),
  component: Page,
});
