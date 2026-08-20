import { createFileRoute } from "@tanstack/react-router";

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
import UnitKerjaTable from "@/features/lainnya/database/unit-kerja/table";
import { TableBoundary } from "@/components/table-boundary";

function UnitKerja() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Unit Kerja</CardTitle>
        <CardDescription>
          Daftar referensi unit kerja untuk BLUD
        </CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="/lainnya/database/unit-kerja/tambah">
              <FiPlus />
              Tambah
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <TableBoundary>
          <UnitKerjaTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/lainnya/database/unit-kerja/",
)({
  component: UnitKerja,
});
