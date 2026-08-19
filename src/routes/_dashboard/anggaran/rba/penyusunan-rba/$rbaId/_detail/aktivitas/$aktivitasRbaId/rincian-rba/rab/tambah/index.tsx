import { createFileRoute } from "@tanstack/react-router";

import { CardDescription, CardTitle } from "@/components/ui/card";
import CreateForm from "@/features/anggaran/rba/penyusunan-rba/$rbaId/aktivitas/$aktivitasRbaId/rincian-rba/rab/tambah/form";

function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <CardTitle>Tambah Rincian RBA</CardTitle>
        <CardDescription>Form untuk menambah rincian pada rba</CardDescription>
      </div>
      <CreateForm />
    </div>
  );
}

export const Route = createFileRoute(
  "/_dashboard/anggaran/rba/penyusunan-rba/$rbaId/_detail/aktivitas/$aktivitasRbaId/rincian-rba/rab/tambah/",
)({
  component: Page,
});
