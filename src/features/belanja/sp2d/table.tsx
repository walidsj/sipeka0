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
import {
  HiOutlineChevronDown,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import { Link, getRouteApi } from "@tanstack/react-router";
import { MonthFilter } from "@/components/month-filter";

const routeApi = getRouteApi("/_dashboard/belanja/sp2d/");

export default function Sp2dTable() {
  const utils = api.useUtils();
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const startDate = search.startDate || format(new Date(), "yyyy-MM-01");
  const endDate = search.endDate || format(new Date(), "yyyy-MM-dd");

  const { data: sp2d } = api.sp2d.getAll.useQuery(
    { startDate, endDate },
    { suspense: true },
  );

  const deleteItem = api.sp2d.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.sp2d.invalidate();
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  if (!sp2d) return <div>Data tidak dapat dimuat.</div>;

  return (
    <div className="flex flex-col gap-5">
      <MonthFilter
        startDate={startDate}
        endDate={endDate}
        onChange={(range) =>
          navigate({ search: (prev) => ({ ...prev, ...range }) })
        }
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1">No.</TableHead>
            <TableHead>Tanggal Dokumen</TableHead>
            <TableHead>Nomor Dokumen</TableHead>
            <TableHead>Uraian Dokumen</TableHead>
            <TableHead className="text-center">Nomor Cek</TableHead>
            <TableHead className="text-right">Jumlah</TableHead>
            <TableHead className="w-1" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sp2d.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">{index + 1}.</TableCell>
              <TableCell className="text-center">
                {format(item.tglDokumen!, "dd/MM/yyyy")}
              </TableCell>
              <TableCell className="text-center font-semibold">
                {item.noDokumen}
              </TableCell>
              <TableCell>{item.uraian}</TableCell>
              <TableCell className="text-center">{item.noCek}</TableCell>
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
                      to="/belanja/sp2d/$sp2dId"
                      params={{ sp2dId: String(item.id) }}
                    >
                      <DropdownMenuItem>
                        <HiOutlineEye />
                        Detail
                      </DropdownMenuItem>
                    </Link>
                    <Link
                      to="/belanja/sp2d/$sp2dId/edit"
                      params={{ sp2dId: String(item.id) }}
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
          {sp2d.length === 0 && (
            <TableRow>
              <TableCell colSpan={100} className="text-center">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
