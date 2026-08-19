import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateForm from "@/features/belanja/spp/tambah/form";
import { api } from "@/trpc/react";
import { formatTanggal } from "@/lib/utils";

function Page() {
  const latest = api.spp.getLatest.useQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buat Dokumen SPP</CardTitle>
        <CardDescription>
          Form untuk menambah dokumen SPP Belanja
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-5">
          <div className="w-full max-w-md">
            <CreateForm />
          </div>
          <div className="w-1/2">
            {latest.data && (
              <Card className="flex flex-row">
                <CardHeader className="pr-0">
                  <img src="/images/icons/idea.png" />
                </CardHeader>
                <CardHeader>
                  <CardDescription className="font-semibold">
                    Data SPP Terakhir
                  </CardDescription>
                  <CardTitle>{latest.data.noDokumen}</CardTitle>
                  <CardDescription>
                    tanggal {formatTanggal(latest.data.tglDokumen)}
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/belanja/spp/tambah/")({
  component: Page,
});
