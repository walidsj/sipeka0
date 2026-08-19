import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateForm from "@/features/belanja/lpj-belanja/tambah/form";
import { api } from "@/trpc/react";
import { formatTanggal } from "@/lib/utils";

function Page() {
  const recentData = api.lpjBelanja.getLatest.useQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rekam LPJ Belanja Baru</CardTitle>
        <CardDescription>
          Form untuk rekam realisasi lPJ Belanja baru
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-5">
          <div className="w-full max-w-md">
            <CreateForm />
          </div>
          <div className="w-1/2">
            {recentData.data && (
              <Card className="flex flex-row">
                <CardHeader className="pr-0">
                  <img src="/images/icons/idea.png" />
                </CardHeader>
                <CardHeader>
                  <CardDescription className="font-semibold">
                    Data Lpj Belanja Terakhir
                  </CardDescription>
                  <CardTitle>{recentData.data.noDokumen}</CardTitle>
                  <CardDescription>{recentData.data.uraian}</CardDescription>
                  <CardDescription>
                    tanggal {formatTanggal(recentData.data.tglDokumen)}
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

export const Route = createFileRoute("/_dashboard/belanja/lpj-belanja/tambah/")(
  {
    component: Page,
  },
);
