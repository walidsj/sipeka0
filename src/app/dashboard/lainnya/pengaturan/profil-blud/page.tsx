import { EditForm } from "./form";
import { api } from "@/trpc/react";

export default function Page() {
  const profilBlud = api.profilBlud.get.useQuery();

  return (
    <div className="flex flex-row gap-5">
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
    </div>
  );
}
