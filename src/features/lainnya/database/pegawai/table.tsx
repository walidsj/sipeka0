import { Badge } from "@/components/ui/badge";
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
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { keepPreviousData } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiChevronsDown, FiEdit, FiTrash } from "react-icons/fi";
import { Link } from "@tanstack/react-router";

export default function PegawaiTable() {
  const pegawai = api.pegawai.getAll.useQuery(
    {},
    { placeholderData: keepPreviousData, suspense: true },
  );

  const deletePegawai = api.pegawai.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      toast.success(data.message);
      pegawai.refetch();
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
          <TableHead colSpan={1}>Nama Lengkap</TableHead>
          <TableHead className="w-1 text-center">Status</TableHead>
          <TableHead>Jabatan</TableHead>
          <TableHead className="w-1" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {pegawai.isSuccess &&
          pegawai.data?.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="text-center">{index + 1}.</TableCell>
              <TableCell>
                <p className="font-semibold">
                  {item.gelarDepan && `${item.gelarDepan} `}
                  {item.nama}
                  {item.gelarBelakang && `, ${item.gelarBelakang}`}
                </p>
                {item.nip && (
                  <p className="text-xs text-slate-500">{item.nip}</p>
                )}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  className={cn(
                    item.statusPegawai === "PPPK" && "bg-secondary",
                    item.statusPegawai === "NON ASN" && "bg-yellow-500",
                    item.statusPegawai === "MOU" && "bg-red-400",
                  )}
                >
                  {item.statusPegawai}
                </Badge>
              </TableCell>
              <TableCell>{item.jabatan}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Aksi <FiChevronsDown className="ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <Link
                      to="/lainnya/database/pegawai/$id/edit"
                      params={{ id: String(item.id) }}
                    >
                      <DropdownMenuItem>
                        <FiEdit className="mr-2" />
                        Edit
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onClick={() => {
                        if (confirm("Apakah anda yakin menghapus data ini?")) {
                          deletePegawai.mutate(item.id);
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
        {pegawai.isSuccess && pegawai.data?.length === 0 && (
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
