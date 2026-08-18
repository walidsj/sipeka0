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
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { keepPreviousData } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiArrowRight, FiChevronsDown, FiEdit, FiTrash } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

export default function AktivitasTable() {
  const params = useParams<{ rbaId: string }>();

  const aktivitasRba = api.aktivitasRba.getByRbaId.useQuery(
    parseInt(params.rbaId ?? ""),
    { placeholderData: keepPreviousData },
  );

  const deleteAktivitasRba = api.aktivitasRba.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      toast.success(data.message);
      aktivitasRba.refetch();
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
          <TableHead>Kode</TableHead>
          <TableHead>Nama Aktivitas</TableHead>
          <TableHead className="text-center">Jenis</TableHead>
          <TableHead className="w-1" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {aktivitasRba.isLoading && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              <Loading />
            </TableCell>
          </TableRow>
        )}
        {aktivitasRba.isSuccess &&
          aktivitasRba.data?.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="text-center">{index + 1}.</TableCell>
              <TableCell>{item.kode}</TableCell>
              <TableCell className="font-semibold">{item.nama}</TableCell>
              <TableCell className="text-center">
                <Badge
                  className={cn(
                    item.jenis === "BELANJA" && "bg-red-500",
                    item.jenis === "PENDAPATAN" && "bg-green-500",
                    item.jenis === "PEMBIAYAAN" && "bg-yellow-500",
                  )}
                >
                  {item.jenis}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button asChild>
                    <Link to={`${item.id}/rincian-rba`}>
                      Rincian RBA
                      <FiArrowRight />
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Aksi <FiChevronsDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <Link to={`${item.id}/edit`}>
                        <DropdownMenuItem>
                          <FiEdit />
                          Edit
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        onClick={() => {
                          if (
                            confirm("Apakah anda yakin menghapus data ini?")
                          ) {
                            deleteAktivitasRba.mutate(item.id);
                          }
                        }}
                        className="text-red-500"
                      >
                        <FiTrash />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        {aktivitasRba.isSuccess && aktivitasRba.data?.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Tidak ada data
            </TableCell>
          </TableRow>
        )}
        {aktivitasRba.isError && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              {aktivitasRba.error.message}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
