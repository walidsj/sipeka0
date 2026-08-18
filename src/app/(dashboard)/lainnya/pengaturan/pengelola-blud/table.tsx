import Loading from "@/components/loading";
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
import { api } from "@/trpc/react";
import { keepPreviousData } from "@tanstack/react-query";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import toast from "react-hot-toast";
import { FiChevronsDown, FiEdit, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function PengelolaBludTable() {
  const pengelolaBlud = api.pengelolaBlud.getAll.useQuery(undefined, {
    placeholderData: keepPreviousData,
  });

  const deletePengelolaBlud = api.pengelolaBlud.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      toast.success(data.message);
      pengelolaBlud.refetch();
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
          <TableHead>Nama Lengkap</TableHead>
          <TableHead className="w-1 text-center">NIP</TableHead>
          <TableHead className="text-center">Jabatan Pengelola</TableHead>
          <TableHead>Nomor/Tanggal SK</TableHead>
          <TableHead className="w-1" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {pengelolaBlud.isLoading && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              <Loading />
            </TableCell>
          </TableRow>
        )}
        {pengelolaBlud.isSuccess &&
          pengelolaBlud.data?.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell>
                {item.pegawai?.gelarDepan && `${item.pegawai.gelarDepan} `}
                {item.pegawai?.nama}
                {item.pegawai?.gelarBelakang &&
                  `, ${item.pegawai.gelarBelakang}`}
              </TableCell>
              <TableCell className="text-center">{item.pegawai?.nip}</TableCell>
              <TableCell className="text-center">
                <Badge>{item.role}</Badge>
              </TableCell>
              <TableCell>
                {item.noSk}
                <br />
                tanggal{" "}
                {format(String(item.tglSk), "dd MMMM yyyy", {
                  locale: id,
                })}
              </TableCell>
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
                          deletePengelolaBlud.mutate(item.id);
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
        {pengelolaBlud.isSuccess && pengelolaBlud.data?.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Tidak ada data
            </TableCell>
          </TableRow>
        )}
        {pengelolaBlud.isError && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              {pengelolaBlud.error.message}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
