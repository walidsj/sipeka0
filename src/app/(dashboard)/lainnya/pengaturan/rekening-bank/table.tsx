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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/react";
import { keepPreviousData } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiChevronsDown, FiEdit, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function RekeningBankTable() {
  const utils = api.useUtils();

  const {
    data: rekeningBank,
  } = api.rekeningBank.getAll.useQuery(undefined, {
    placeholderData: keepPreviousData,
    suspense: true,
  });

  const deleteRekeningBank = api.rekeningBank.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      toast.success(data.message);
      utils.rekeningBank.invalidate();
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  if (!rekeningBank) return <div>Data tidak dapat dimuat.</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1 text-center">No.</TableHead>
          <TableHead>Nama Bank</TableHead>
          <TableHead className="text-center">Nomor Rekening</TableHead>
          <TableHead>Nama di Rekening</TableHead>
          <TableHead className="w-1" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {rekeningBank.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell className="text-center">{index + 1}.</TableCell>
            <TableCell className="font-semibold">{item.bank?.nama}</TableCell>
            <TableCell className="text-center font-semibold">
              {item.noRekening}
            </TableCell>
            <TableCell className="font-semibold">{item.namaRekening}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Aksi <FiChevronsDown className="ml-2" />
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
                        deleteRekeningBank.mutate(item.id);
                      }
                    }}
                    className="text-red-500"
                  >
                    <FiTrash className="mr-2" />
                    Hapus
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
        {rekeningBank.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Tidak ada data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
