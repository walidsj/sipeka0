import { createFileRoute } from "@tanstack/react-router";

import { CardDescription, CardTitle } from "@/components/ui/card";
import { useParams } from "@tanstack/react-router";
import EditForm from "@/features/lainnya/pengaturan/pengelola-blud/$id/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";

function Page() {
  const params = useParams({ strict: false }) as Record<string, string>;

  const pengelolaBlud = api.pengelolaBlud.getById.useQuery(
    parseInt(params.id!),
  );

  if ((pengelolaBlud.isSuccess && !pengelolaBlud.data) || pengelolaBlud.isError)
    return <NotFound />;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <CardTitle>Edit Pengelola</CardTitle>
        <CardDescription>Form untuk mengedit data pengelola</CardDescription>
      </div>
      {pengelolaBlud.isSuccess && pengelolaBlud.data && (
        <EditForm data={pengelolaBlud.data} />
      )}
    </div>
  );
}

export const Route = createFileRoute(
  "/_dashboard/lainnya/pengaturan/pengelola-blud/$id/edit/",
)({
  component: Page,
});
