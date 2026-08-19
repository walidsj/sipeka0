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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatAngka } from "@/lib/utils";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import {
  HiOutlineChevronDown,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import { Link } from "@tanstack/react-router";

export default function LpjBelanjaTable() {
  const utils = api.useUtils();

  const { data: lpjBelanja } = api.lpjBelanja.getAll.useQuery(
    {},
    { suspense: true },
  );

  const deleteItem = api.lpjBelanja.deleteById.useMutation({
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

  if (!lpjBelanja) return <div>Data tidak dapat dimuat.</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1">No.</TableHead>
          <TableHead>Tanggal Dokumen</TableHead>
          <TableHead>Nomor Dokumen</TableHead>
          <TableHead>Uraian</TableHead>
          <TableHead className="text-center">Jenis</TableHead>
          <TableHead className="text-right">Jumlah</TableHead>
          <TableHead className="w-1" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {lpjBelanja.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="text-center">{index + 1}.</TableCell>
            <TableCell className="text-center">
              {format(item.tglDokumen!, "dd/MM/yyyy")}
            </TableCell>
            <TableCell className="text-center font-semibold">
              {item.noDokumen}
            </TableCell>
            <TableCell>{item.uraian}</TableCell>
            <TableCell className="text-center">
              {item.jenis === "GU" && <Badge>GU</Badge>}
              {item.jenis === "LS" && (
                <Badge className="bg-green-500">LS</Badge>
              )}
              {item.jenis === "TU" && (
                <Badge className="bg-yellow-500">TU</Badge>
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
                    to="/belanja/lpj-belanja/$lpjBelanjaId"
                    params={{ lpjBelanjaId: String(item.id) }}
                  >
                    <DropdownMenuItem>
                      <HiOutlineEye />
                      Detail
                    </DropdownMenuItem>
                  </Link>
                  <Link
                    to="/belanja/lpj-belanja/$lpjBelanjaId/edit"
                    params={{ lpjBelanjaId: String(item.id) }}
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
        {lpjBelanja.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Tidak ada data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableHead colSpan={5} className="text-center">
            Total
          </TableHead>
          <TableHead>
            {formatAngka(
              lpjBelanja.reduce((acc, curr) => acc + Number(curr.jumlah), 0),
            )}
          </TableHead>
          <TableHead />
        </TableRow>
      </TableFooter>
    </Table>
  );
}
