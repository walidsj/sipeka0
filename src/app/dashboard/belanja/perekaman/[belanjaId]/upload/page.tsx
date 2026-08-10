import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateForm from "./form";
import { api } from "@/trpc/react";
import Loading from "@/components/loading";
import NotFound from "@/app/not-found";
import { useParams } from "react-router-dom";
import { formatAngka, formatTanggal } from "@/lib/utils";
import { FiFile } from "react-icons/fi";

export default function Page() {
  const params = useParams<{ belanjaId: string }>();

  const {
    data: belanja,
    isError,
    isLoading,
  } = api.belanja.getById.useQuery(Number(params.belanjaId));

  if (isLoading) return <Loading />;

  if (isError) return <NotFound />;

  if (!belanja) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload File Belanja</CardTitle>
      </CardHeader>
      <CardContent>
        <CardTitle>{belanja.noDokumen}</CardTitle>
        <CardDescription>{belanja.uraian}</CardDescription>
        <CardDescription>
          tanggal {formatTanggal(belanja.tglDokumen)}
        </CardDescription>
        <CardDescription>Rp. {formatAngka(belanja.jumlah)}</CardDescription>
      </CardContent>
      {belanja.file && (
        <CardContent>
          <CardDescription>File yang sudah diupload:</CardDescription>
          <a
            href={"/api/storage/files/belanja/" + belanja.file}
            target="_blank"
          >
            <div className="flex flex-row items-center space-x-2 rounded-lg border p-2">
              <FiFile className="text-primary h-10 w-10" />
              <span>{belanja.file}</span>
            </div>
          </a>
        </CardContent>
      )}
      <CardContent>
        <CreateForm belanjaId={belanja.id} />
      </CardContent>
    </Card>
  );
}
