import { createFileRoute } from "@tanstack/react-router";

import { Link, Outlet } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { ListIcon, XSquareIcon } from "lucide-react";

function Layout() {
  const rbaMonitoring = api.dba.getRbaBelanjaMonitoring.useQuery();
  const unclassifiedBelanja =
    api.belanja.getUnclassifiedBelanjaByRba.useQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monitoring Realisasi Belanja</CardTitle>
        <CardDescription>
          Rincian realisasi belanja berdasarkan DBA
        </CardDescription>
      </CardHeader>
      {rbaMonitoring.data && (
        <CardContent>
          <Card>
            <CardHeader className="flex flex-row gap-5">
              <img src="/images/icons/contract.png" className="h-20 w-20" />
              <div className="flex flex-col gap-1">
                <CardDescription>RBA yang Aktif Saat Ini</CardDescription>
                <CardTitle>{rbaMonitoring.data?.uraian}</CardTitle>
                <CardDescription>
                  No. {rbaMonitoring.data?.noDokumen}, tanggal{" "}
                  {format(
                    String(rbaMonitoring.data?.tglDokumen),
                    "dd MMMM yyyy",
                    { locale: id },
                  )}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </CardContent>
      )}
      <CardContent>
        <Card>
          <CardContent>
            <Button variant="ghost" asChild>
              <Link to="/anggaran/monitoring/realisasi-belanja">
                <ListIcon />
                Realisasi
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/anggaran/monitoring/realisasi-belanja/tidak-terklasifikasi">
                <XSquareIcon />
                Belanja Tidak Terklasifikasi
                {unclassifiedBelanja.data &&
                  unclassifiedBelanja.data?.length > 0 && (
                    <span className="ml-2 rounded-full bg-red-500 px-2 text-sm text-white">
                      {unclassifiedBelanja.data?.length}
                    </span>
                  )}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </CardContent>
      <CardContent>
        <Outlet />
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/anggaran/monitoring/realisasi-belanja",
)({
  component: Layout,
});
