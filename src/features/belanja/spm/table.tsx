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
import { formatAngka } from "@/lib/utils";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import {
  HiOutlineChevronDown,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import { Link } from "@tanstack/react-router";

export default function SpmTable() {
  const utils = api.useUtils();

  const { data: spm } = api.spm.getAll.useQuery({}, { suspense: true });

  const deleteItem = api.spm.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.spm.invalidate();
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  if (!spm) return <div>Data tidak dapat dimuat.</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1">No.</TableHead>
          <TableHead>Tanggal Dokumen</TableHead>
          <TableHead>Nomor Dokumen</TableHead>
          <TableHead>Uraian Dokumen</TableHead>
          <TableHead className="text-right">Jumlah</TableHead>
          <TableHead className="w-1" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {spm.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="text-center">{index + 1}.</TableCell>
            <TableCell className="text-center">
              {format(item.tglDokumen!, "dd/MM/yyyy")}
            </TableCell>
            <TableCell className="text-center font-semibold">
              {item.noDokumen}
            </TableCell>
            <TableCell>
              {item.uraian}
              <br />
              <br />
              {item.sp2d && (
                <span className="text-xs font-medium text-nowrap text-neutral-400">
                  <FaCheckCircle className="mr-0.5 inline-flex text-green-500" />
                  SP2D
                </span>
              )}
            </TableCell>
            <TableCell className="text-right font-semibold">
              {formatAngka(item.jumlah)}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline">
                    Aksi <HiOutlineChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <Link
                    to="/belanja/spm/$spmId"
                    params={{ spmId: String(item.id) }}
                  >
                    <DropdownMenuItem>
                      <HiOutlineEye />
                      Detail
                    </DropdownMenuItem>
                  </Link>
                  <Link
                    to="/belanja/spm/$spmId/edit"
                    params={{ spmId: String(item.id) }}
                  >
                    <DropdownMenuItem>
                      <HiOutlinePencil />
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
                    <HiOutlineTrash />
                    Hapus
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
        {spm.length === 0 && (
          <TableRow>
            <TableCell colSpan={100} className="text-center">
              Tidak ada data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
