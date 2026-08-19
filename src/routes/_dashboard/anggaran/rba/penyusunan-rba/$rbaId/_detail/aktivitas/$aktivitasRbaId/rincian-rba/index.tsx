import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import RincianRabTable from "@/features/anggaran/rba/penyusunan-rba/$rbaId/aktivitas/$aktivitasRbaId/rincian-rba/rab-table";
import RincianRapTable from "@/features/anggaran/rba/penyusunan-rba/$rbaId/aktivitas/$aktivitasRbaId/rincian-rba/rap-table";
import { Spinner } from "@/components/ui/spinner";
import NotFound from "@/components/not-found";
const routeApi = getRouteApi(
  "/_dashboard/anggaran/rba/penyusunan-rba/$rbaId/_detail/aktivitas/$aktivitasRbaId/rincian-rba/",
);

function Page() {
  const params = routeApi.useParams();

  const aktivitasRba = api.aktivitasRba.getById.useQuery(
    parseInt(params.aktivitasRbaId ?? ""),
  );

  if ((aktivitasRba.isSuccess && !aktivitasRba.data) || aktivitasRba.isError)
    return <NotFound />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <CardTitle>Rincian RBA</CardTitle>
          <CardDescription>Daftar rincian RBA dalam aktivitas</CardDescription>
        </div>
        {aktivitasRba.data?.jenis === "BELANJA" && (
          <Button asChild>
            <Link
              to="/anggaran/rba/penyusunan-rba/$rbaId/aktivitas/$aktivitasRbaId/rincian-rba/rab/tambah"
              params={{
                rbaId: params.rbaId,
                aktivitasRbaId: params.aktivitasRbaId,
              }}
            >
              <FiPlus />
              Tambah Rincian
            </Link>
          </Button>
        )}
        {aktivitasRba.data?.jenis === "PENDAPATAN" && (
          <Button asChild>
            <Link
              to="/anggaran/rba/penyusunan-rba/$rbaId/aktivitas/$aktivitasRbaId/rincian-rba/rap/tambah"
              params={{
                rbaId: params.rbaId,
                aktivitasRbaId: params.aktivitasRbaId,
              }}
            >
              <FiPlus />
              Tambah Rincian
            </Link>
          </Button>
        )}
      </div>
      {aktivitasRba.isLoading && <Spinner />}
      {aktivitasRba.data && (
        <Card>
          <CardHeader>
            <CardDescription>
              <Badge
                className={cn(
                  aktivitasRba.data?.jenis === "BELANJA" && "bg-red-500",
                  aktivitasRba.data?.jenis === "PENDAPATAN" && "bg-green-500",
                  aktivitasRba.data?.jenis === "PEMBIAYAAN" && "bg-yellow-500",
                )}
              >
                {aktivitasRba.data?.jenis}
              </Badge>
            </CardDescription>
            <CardDescription>{aktivitasRba.data?.kode} </CardDescription>
            <CardTitle>{aktivitasRba.data?.nama}</CardTitle>
          </CardHeader>
        </Card>
      )}

      {aktivitasRba.data?.jenis === "BELANJA" && <RincianRabTable />}
      {aktivitasRba.data?.jenis === "PENDAPATAN" && <RincianRapTable />}
    </div>
  );
}

export const Route = createFileRoute(
  "/_dashboard/anggaran/rba/penyusunan-rba/$rbaId/_detail/aktivitas/$aktivitasRbaId/rincian-rba/",
)({
  component: Page,
});
