import { createFileRoute } from "@tanstack/react-router";

import { EditForm } from "@/features/lainnya/pengaturan/profil-blud/form";
import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Page() {
  const profilBlud = api.profilBlud.get.useQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil BLUD</CardTitle>
        <CardDescription>Data profil rumah sakit BLUD</CardDescription>
      </CardHeader>
      <CardContent>
        {profilBlud.isSuccess && (
          <EditForm
            data={
              profilBlud.data
                ? profilBlud.data
                : {
                    nama: "",
                    alamat: "",
                    noFax: "",
                    noTelp: "",
                    email: "",
                    website: "",
                  }
            }
          />
        )}
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_dashboard/lainnya/pengaturan/profil-blud/",
)({
  component: Page,
});
