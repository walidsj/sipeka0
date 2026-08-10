import Loading from "@/components/loading";
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
import { useParams } from "react-router-dom";

export default function BelanjaEmptyLpjTable() {
  const utils = api.useUtils();
  const params = useParams<{ lpjBelanjaId: string }>();

  const {
    isLoading,
    isError,
    error,
    data: belanja,
  } = api.lpjBelanja.getBelanjaByLpjBelanjaId.useQuery(
    Number(params.lpjBelanjaId),
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

  if (isLoading) return <Loading />;

  if (isError) {
    return <div>{error.message}</div>;
  }

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
