import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatAngka, formatTanggal } from "@/lib/utils";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { HiOutlinePlus } from "react-icons/hi";
import { getRouteApi } from "@tanstack/react-router";
const routeApi = getRouteApi(
  "/_dashboard/belanja/lpj-belanja/$lpjBelanjaId/tambah-belanja/",
);

export default function BelanjaTable() {
  const utils = api.useUtils();
  const params = routeApi.useParams();

  const { data: belanja } = api.lpjBelanja.getBelanjaByEmptyLpjBelanja.useQuery(
    undefined,
    { suspense: true },
  );

  const addItemToLpjBelanja = api.lpjBelanja.addItemToLpjBelanja.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.lpjBelanja.invalidate();
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  if (!belanja) return <div>Data tidak dapat dimuat.</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1">No.</TableHead>
          <TableHead>Tanggal Dokumen</TableHead>
          <TableHead>Nomor Dokumen</TableHead>
          <TableHead>Uraian</TableHead>
          <TableHead>Jumlah</TableHead>
          <TableHead className="w-1" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {belanja.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="text-center">{index + 1}.</TableCell>
            <TableCell>{formatTanggal(item.tglDokumen)}</TableCell>
            <TableCell>{item.noDokumen}</TableCell>
            <TableCell>{item.uraian}</TableCell>
            <TableCell className="text-right">
              {formatAngka(item.jumlah)}
            </TableCell>
            <TableCell>
              <Button
                size="icon"
                onClick={() =>
                  addItemToLpjBelanja.mutate({
                    lpjBelanjaId: Number(params.lpjBelanjaId),
                    id: item.id,
                  })
                }
              >
                <HiOutlinePlus />
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {belanja.length === 0 && (
          <TableRow>
            <TableCell className="text-center" colSpan={100}>
              Tidak ada data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
