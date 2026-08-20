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
import BankTable from "@/features/lainnya/database/bank/table";
import { TableBoundary } from "@/components/table-boundary";

function Bank() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Bank</CardTitle>
        <CardDescription>
          Daftar referensi bank untuk transaksi BLUD
        </CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="/lainnya/database/bank/tambah">
              <FiPlus />
              Tambah
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <TableBoundary>
          <BankTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/lainnya/database/bank/")({
  validateSearch: z.object({
    search: z.string().optional(),
    page: z.string().optional(),
    pageSize: z.string().optional(),
  }),
  component: Bank,
});
