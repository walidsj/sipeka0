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
import { handleCopy } from "@/utils/clipboard";
import toast from "react-hot-toast";
import { FiChevronsDown, FiCopy, FiEdit, FiTrash } from "react-icons/fi";
import { Link, getRouteApi } from "@tanstack/react-router";
const routeApi = getRouteApi("/_dashboard/belanja/perekaman/$belanjaId/");

export default function PotonganTable({
  belanja,
}: {
  belanja: { uraian?: string | null; jumlah: string | number | null };
}) {
  const params = routeApi.useParams();
  const utils = api.useUtils();

  const { data: potongan } = api.belanja.getPotonganByBelanjaId.useQuery(
    Number(params.belanjaId),
    { suspense: true },
  );

  const deletePotongan = api.belanja.deletePotonganById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.belanja.invalidate();
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  if (!potongan) return <div>Data tidak dapat dimuat.</div>;

  const totalPotongan = potongan.reduce(
    (acc, item) => acc + Number(item.jumlah),
    0,
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1">No.</TableHead>
          <TableHead>Jenis Potongan</TableHead>
          <TableHead>Kode Billing</TableHead>
          <TableHead>Kode NTPN</TableHead>
          <TableHead>Nominal</TableHead>
          <TableHead className="w-0" />
          <TableHead className="w-1" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {potongan.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="text-center">{index + 1}.</TableCell>
            <TableCell>
              {item.jenis}
              <Button
                size="icon"
                variant="outline"
                className="ml-3"
                onClick={() =>
                  handleCopy(
                    `[${item.jenis}] ${belanja.uraian} (Rp${Number(belanja.jumlah).toLocaleString("id")})`,
                  )
                }
              >
                <FiCopy />
              </Button>
            </TableCell>
            <TableCell>{item.billing}</TableCell>
            <TableCell>{item.ntpn}</TableCell>
            <TableCell className="text-right">
              {formatAngka(item.jumlah)}
            </TableCell>
            <TableCell>
              <Button
                size="icon"
                variant="outline"
                onClick={() => handleCopy(Number(item.jumlah).toString())}
              >
                <FiCopy />
              </Button>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Aksi <FiChevronsDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <Link
                    to="/belanja/perekaman/$belanjaId/potongan/$potonganId/edit"
                    params={{
                      belanjaId: params.belanjaId,
                      potonganId: String(item.id),
                    }}
                  >
                    <DropdownMenuItem>
                      <FiEdit />
                      Edit
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    onClick={() => {
                      if (confirm("Apakah anda yakin menghapus data ini?")) {
                        deletePotongan.mutate(item.id);
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
        {potongan.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Tidak ada data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total Potongan</TableCell>
          <TableCell className="text-right">
            {formatAngka(totalPotongan)}
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
      </TableFooter>
    </Table>
  );
}
