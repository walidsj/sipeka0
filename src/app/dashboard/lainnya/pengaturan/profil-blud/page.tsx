import { EditForm } from "./form";
import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
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
