import { createFileRoute } from "@tanstack/react-router";

import { CardDescription, CardTitle } from "@/components/ui/card";
import { useParams } from "@tanstack/react-router";
import EditForm from "@/features/lainnya/pengaturan/rekening-bank/$id/edit/form";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";

function Page() {
  const params = useParams({ strict: false }) as Record<string, string>;

  const rekeningBank = api.rekeningBank.getById.useQuery(parseInt(params.id!));

  if ((rekeningBank.isSuccess && !rekeningBank.data) || rekeningBank.isError)
    return <NotFound />;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <CardTitle>Edit Rekening Bank</CardTitle>
        <CardDescription>
          Form untuk mengedit data rekening bank
        </CardDescription>
      </div>
      {rekeningBank.isSuccess && rekeningBank.data && (
        <EditForm data={rekeningBank.data} />
      )}
    </div>
  );
}

export const Route = createFileRoute(
  "/_dashboard/lainnya/pengaturan/rekening-bank/$id/edit/",
)({
  component: Page,
});
