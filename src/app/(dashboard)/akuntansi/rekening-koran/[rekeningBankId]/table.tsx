import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatAngkaDecimal } from "@/lib/utils";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { HiOutlineChevronDown, HiOutlineTrash } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import CreateForm from "./form";
import { keepPreviousData } from "@tanstack/react-query";
import { FiEdit } from "react-icons/fi";

export default function RekeningKoranTable() {
  const utils = api.useUtils();

  const params = useParams<{ rekeningBankId: string }>();

  const {
    data: rekeningKoran,
  } = api.rekeningKoran.getAllByRekeningBankId.useQuery(
    Number(params.rekeningBankId),
    {
      placeholderData: keepPreviousData,
      suspense: true,
    },
  );

  const deleteItem = api.rekeningKoran.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.rekeningKoran.invalidate();
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  if (!rekeningKoran) return <div>Data tidak dapat dimuat.</div>;

  let saldo = 0;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1">No.</TableHead>
          <TableHead>Tanggal Dokumen</TableHead>
          <TableHead>Keterangan Mutasi</TableHead>
          <TableHead>No. Referensi</TableHead>
          <TableHead className="text-right">Debet</TableHead>
          <TableHead className="text-right">Kredit</TableHead>
          <TableHead className="text-right">Saldo</TableHead>
          <TableHead>Keterangan Tambahan</TableHead>
          <TableHead className="w-1" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {rekeningKoran.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="text-center">{index + 1}.</TableCell>
            <TableCell className="font-semibold">
              {Intl.DateTimeFormat("id", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              }).format(new Date(item.tglTransaksi || ""))}
            </TableCell>
            <TableCell className="font-semibold">{item.keterangan}</TableCell>
            <TableCell className="font-semibold">{item.noReferensi}</TableCell>
            <TableCell className="text-right font-semibold">
              {formatAngkaDecimal(item.debet)}
            </TableCell>
            <TableCell className="text-right font-semibold">
              {formatAngkaDecimal(item.kredit)}
            </TableCell>
            <TableCell className="text-right font-semibold">
              {formatAngkaDecimal(
                (saldo += Number(item.kredit) - Number(item.debet)),
              )}
            </TableCell>
            <TableCell className="font-semibold">
              {item.keteranganTambahan}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Aksi <HiOutlineChevronDown className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <Link to={`${item.id}/edit`}>
                    <DropdownMenuItem>
                      <FiEdit className="mr-2" />
                      Edit
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    onClick={() => {
                      if (confirm("Apakah anda yakin menghapus data ini?")) {
                        deleteItem.mutate(item.id);
                      }
                    }}
                    className="text-red-500"
                  >
                    <HiOutlineTrash className="mr-2" />
                    Hapus
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
        {rekeningKoran.length === 0 && (
          <TableRow>
            <TableCell colSpan={100} className="text-center">
              Tidak ada data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">
            {formatAngkaDecimal(
              rekeningKoran.reduce((acc, item) => acc + Number(item.debet), 0),
            )}
          </TableCell>
          <TableCell className="text-right">
            {formatAngkaDecimal(
              rekeningKoran.reduce((acc, item) => acc + Number(item.kredit), 0),
            )}
          </TableCell>
          <TableCell className="text-right">
            {formatAngkaDecimal(saldo)}
          </TableCell>
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell className="bg-card" colSpan={100}>
            <CreateForm rekeningBankId={Number(params.rekeningBankId)} />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
