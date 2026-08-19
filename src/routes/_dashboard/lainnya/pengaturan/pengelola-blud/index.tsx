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
import PengelolaBludTable from "@/features/lainnya/pengaturan/pengelola-blud/table";
import { TableBoundary } from "@/components/table-boundary";

function PengelolaBlud() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Penetapan Pengelola BLUD</CardTitle>
        <CardDescription>
          Daftar pegawai yang berperan sebagai pengelola BLUD
        </CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="/lainnya/pengaturan/pengelola-blud/tambah">
              <FiPlus className="mr-2" />
              Tambah
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <TableBoundary>
          <PengelolaBludTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/lainnya/pengaturan/pengelola-blud/",
)({
  component: PengelolaBlud,
});
