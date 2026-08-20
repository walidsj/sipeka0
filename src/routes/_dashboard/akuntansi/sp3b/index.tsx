import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { FiPlus } from "react-icons/fi";
import Sp3bTable from "@/features/akuntansi/sp3b/table";
import { TableBoundary } from "@/components/table-boundary";

function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar SP3B</CardTitle>
        <CardDescription>
          Data surat perintah pengesahan pendapatan dan belanja (SP3B)
        </CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="/akuntansi/sp3b/tambah">
              <FiPlus />
              Buat
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <TableBoundary>
          <Sp3bTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/akuntansi/sp3b/")({
  component: Page,
});
