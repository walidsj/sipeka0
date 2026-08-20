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

export default function RekananTable() {
  const rekanan = api.rekanan.getAll.useQuery(
    {},
    { placeholderData: keepPreviousData, suspense: true },
  );

  const deleteRekanan = api.rekanan.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      toast.success(data.message);
      rekanan.refetch();
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
          <TableHead colSpan={1}>Nama Rekanan</TableHead>
          <TableHead className="text-center">Jenis</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">NPWP</TableHead>
          <TableHead className="w-1" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {rekanan.isSuccess &&
          rekanan.data?.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="text-center">{index + 1}.</TableCell>
              <TableCell>
                <p className="block font-semibold">{item.nama}</p>
                <span className="line-clamp-1 text-xs text-slate-500">
                  {item.alamat}
                </span>
              </TableCell>
              <TableCell className="text-center">{item.jenis}</TableCell>
              <TableCell className="text-center">
                <Badge
                  className={cn(
                    item.statusRekanan === "BIASA" && "bg-secondary",
                    item.statusRekanan === "MOU" && "bg-red-400",
                  )}
                >
                  {item.statusRekanan}
                </Badge>
              </TableCell>
              <TableCell className="text-center">{item.npwp}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Aksi <FiChevronsDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <Link
                      to="/lainnya/database/rekanan/$id/edit"
                      params={{ id: String(item.id) }}
                    >
                      <DropdownMenuItem>
                        <FiEdit />
                        Edit
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onClick={() => {
                        if (confirm("Apakah anda yakin menghapus data ini?")) {
                          deleteRekanan.mutate(item.id);
                        }
                      }}
                      className="text-red-500"
                    >
                      <FiTrash />
                      Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        {rekanan.isSuccess && rekanan.data?.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              Tidak ada data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
