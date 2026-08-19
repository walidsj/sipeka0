import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "@tanstack/react-router";
import EditForm from "@/features/anggaran/monitoring/realisasi-belanja/$rincianRbaBelanjaId/edit/form";
import { api } from "@/trpc/react";
import { FiChevronsRight } from "react-icons/fi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import NotFound from "@/components/not-found";

function EditPage() {
  const params = useParams({ strict: false }) as Record<string, string>;

  const rincianRbaBelanja = api.rincianRbaBelanja.getById.useQuery(
    parseInt(params.rincianRbaBelanjaId ?? ""),
  );

  if (
    (rincianRbaBelanja.isSuccess && !rincianRbaBelanja.data) ||
    rincianRbaBelanja.isError
  )
    return <NotFound />;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <CardTitle>Edit Pagu</CardTitle>
        <CardDescription>Akses cepat untuk mengubah data pagu</CardDescription>
      </div>
      <div className="flex flex-row gap-5">
        <Card className="max-w-lg">
          <CardHeader className="space-y-1.5">
            <div className="space-y-1">
              <Label>Satuan</Label>
              <Input
                disabled
                value={rincianRbaBelanja.data?.satuan ?? undefined}
              />
            </div>
            <div className="space-y-1">
              <Label>Volume</Label>
              <Input
                disabled
                value={
                  Number(rincianRbaBelanja.data?.volume).toLocaleString(
                    "id-ID",
                  ) ?? undefined
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Harga</Label>
              <Input
                disabled
                value={`Rp ${
                  Number(rincianRbaBelanja.data?.harga).toLocaleString(
                    "id-ID",
                  ) ?? undefined
                }`}
              />
            </div>
            <div className="text-right">
              <Label>Jumlah</Label>
              <p className="text-lg font-semibold">
                {Number(
                  Number(rincianRbaBelanja.data?.volume) *
                    Number(rincianRbaBelanja.data?.harga),
                ).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
          </CardHeader>
        </Card>
        <div className="mt-20">
          <FiChevronsRight className="text-7xl text-gray-400" />
          <div className="text-center text-gray-400">Menjadi</div>
        </div>
        {rincianRbaBelanja.isSuccess && rincianRbaBelanja.data && (
          <EditForm data={rincianRbaBelanja.data} />
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute(
  "/_dashboard/anggaran/monitoring/realisasi-belanja/$rincianRbaBelanjaId/edit/",
)({
  component: EditPage,
});
