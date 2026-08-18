import { EditForm } from "./form";
import { api } from "@/trpc/react";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  const profilBlud = api.profilBlud.get.useQuery();

  return (
    <Card>
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
