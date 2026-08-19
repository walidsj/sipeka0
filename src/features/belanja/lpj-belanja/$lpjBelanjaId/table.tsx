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
import { HiOutlineTrash } from "react-icons/hi";
import { useParams } from "@tanstack/react-router";

export default function BelanjaEmptyLpjTable() {
  const utils = api.useUtils();
  const params = useParams({ strict: false }) as Record<string, string>;

  const { data: belanja } = api.lpjBelanja.getBelanjaByLpjBelanjaId.useQuery(
    Number(params.lpjBelanjaId),
    { suspense: true },
  );

  const deleteItem = api.lpjBelanja.deleteLpjBelanjaIdBelanja.useMutation({
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
                variant="destructive"
                size="icon"
                onClick={() => {
                  if (confirm("Apakah anda yakin menghapus data ini?")) {
                    deleteItem.mutate(item.id);
                  }
                }}
              >
                <HiOutlineTrash />
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
