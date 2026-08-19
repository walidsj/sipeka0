import { createFileRoute } from "@tanstack/react-router";

import NotFound from "@/components/not-found";
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
import { Outlet, useParams } from "@tanstack/react-router";

function Layout() {
  const params = useParams({ strict: false }) as Record<string, string>;

  const rba = api.rba.getById.useQuery(parseInt(params.rbaId ?? ""));

  if ((rba.isSuccess && !rba.data) || rba.isError) return <NotFound />;

  return (
    <div className="flex flex-col gap-5">
      <Card>
        {rba.data && (
          <CardHeader className="flex flex-row justify-start gap-5">
            <img
              src="/images/icons/research.png"
              className="h-20 w-20"
              alt="RBA"
            />
            <div className="flex flex-col gap-1">
              <CardDescription>
                Rencana Bisnis dan Anggaran (RBA)
              </CardDescription>
              <CardTitle>{rba.data?.uraian}</CardTitle>
              <CardDescription>
                No. Dokumen: {rba.data?.noDokumen}, tanggal:{" "}
                {format(String(rba.data.tglDokumen ?? ""), "dd MMMM yyyy", {
                  locale: id,
                })}
              </CardDescription>
            </div>
          </CardHeader>
        )}
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute(
  "/_dashboard/anggaran/rba/penyusunan-rba/$rbaId/_detail",
)({
  component: Layout,
});
