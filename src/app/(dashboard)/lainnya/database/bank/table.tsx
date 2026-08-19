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

export default function BankTable() {
  const bank = api.bank.getAll.useQuery(
    {},
    { placeholderData: keepPreviousData, suspense: true },
  );

  const deleteBank = api.bank.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      toast.success(data.message);
      bank.refetch();
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1 text-center">No.</TableHead>
          <TableHead colSpan={1}>Nama Bank</TableHead>
          <TableHead className="text-center">Kode Bank</TableHead>
          <TableHead className="w-1" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {bank.isSuccess &&
          bank.data?.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="text-center">{index + 1}.</TableCell>
              <TableCell className="font-semibold">{item.nama}</TableCell>
              <TableCell className="text-center">{item.kode}</TableCell>
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
                          deleteBank.mutate(item.id);
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
        {bank.isSuccess && bank.data?.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Tidak ada data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
