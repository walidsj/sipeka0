import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { Link, useParams } from "@tanstack/react-router";
import AktivitasTable from "@/features/anggaran/rba/penyusunan-rba/$rbaId/aktivitas/table";
import { TableBoundary } from "@/components/table-boundary";

import { CardDescription, CardTitle } from "@/components/ui/card";

function Page() {
  const params = useParams({ strict: false }) as Record<string, string>;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <CardTitle>Aktivitas</CardTitle>
          <CardDescription>Daftar aktivitas BLUD dalam RBA</CardDescription>
        </div>
        <Button asChild>
          <Link
            to="/anggaran/rba/penyusunan-rba/$rbaId/aktivitas/tambah"
            params={{ rbaId: params.rbaId }}
          >
            <FiPlus />
            Tambah
          </Link>
        </Button>
      </div>
      <TableBoundary>
        <AktivitasTable />
      </TableBoundary>
    </div>
  );
}

export const Route = createFileRoute(
  "/_dashboard/anggaran/rba/penyusunan-rba/$rbaId/_detail/aktivitas/",
)({
  component: Page,
});
