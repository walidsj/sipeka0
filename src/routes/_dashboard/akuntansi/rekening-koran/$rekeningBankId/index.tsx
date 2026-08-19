import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RekeningKoranTable from "@/features/akuntansi/rekening-koran/$rekeningBankId/table";
import { TableBoundary } from "@/components/table-boundary";

import { useParams } from "@tanstack/react-router";
import { api } from "@/trpc/react";
import NotFound from "@/components/not-found";
import { Spinner } from "@/components/ui/spinner";

function Page() {
  const params = useParams({ strict: false }) as Record<string, string>;

  const {
    isError,
    isLoading,
    data: rekeningBank,
  } = api.rekeningBank.getById.useQuery(Number(params.rekeningBankId));

  if (isLoading) return <Spinner />;

  if (isError) return <NotFound />;

  if (!rekeningBank) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rekening Koran</CardTitle>
        <CardDescription>Daftar Rekening Koran Bank BLUD</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-4">
          <img src="/images/icons/research.png" className="h-16" />
          <div>
            <CardDescription>{rekeningBank?.noRekening}</CardDescription>
            <CardTitle>{rekeningBank?.namaRekening}</CardTitle>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <TableBoundary>
          <RekeningKoranTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/akuntansi/rekening-koran/$rekeningBankId/",
)({
  component: Page,
});
