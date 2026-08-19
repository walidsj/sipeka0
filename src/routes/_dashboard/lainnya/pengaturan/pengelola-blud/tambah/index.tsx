import { createFileRoute } from "@tanstack/react-router";

import { CardDescription, CardTitle } from "@/components/ui/card";
import CreateForm from "@/features/lainnya/pengaturan/pengelola-blud/tambah/form";

function Page() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <CardTitle>Tambah Pengelola</CardTitle>
        <CardDescription>Form untuk menambah data pengelola</CardDescription>
      </div>
      <CreateForm />
    </div>
  );
}

export const Route = createFileRoute(
  "/_dashboard/lainnya/pengaturan/pengelola-blud/tambah/",
)({
  component: Page,
});
