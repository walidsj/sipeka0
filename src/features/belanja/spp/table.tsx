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
import { Link, getRouteApi } from "@tanstack/react-router";
import { MonthFilter, defaultDateRange } from "@/components/month-filter";
import { useAuth } from "@/lib/auth";

const routeApi = getRouteApi("/_dashboard/belanja/spp/");

export default function SppTable() {
  const utils = api.useUtils();
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const { user } = useAuth();
  const tahun = user?.tahun ?? "2026";
  const startDate = search.startDate || defaultDateRange(tahun).startDate;
  const endDate = search.endDate || defaultDateRange(tahun).endDate;

  const { data: spp } = api.spp.getAll.useQuery(
    { startDate, endDate },
    { suspense: true },
  );

  const deleteItem = api.spp.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.spp.invalidate();
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  if (!spp) return <div>Data tidak dapat dimuat.</div>;

  return (
    <div className="flex flex-col gap-5">
      <MonthFilter
        startDate={startDate}
        endDate={endDate}
        tahun={tahun}
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
            <TableHead className="text-right">Jumlah</TableHead>
            <TableHead className="w-1" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {spp.map((item, index) => (
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
                {item.spm && (
                  <span className="text-xs font-medium text-neutral-400">
                    <FaCheckCircle className="mr-0.5 inline-flex text-green-500" />
                    SPM
                  </span>
                )}{" "}
                {item.sp2d && (
                  <span className="text-xs font-medium text-neutral-400">
                    <FaCheckCircle className="mr-0.5 inline-flex text-green-500" />
                    SP2D
                  </span>
                )}{" "}
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
                      to="/belanja/spp/$sppId"
                      params={{ sppId: String(item.id) }}
                    >
                      <DropdownMenuItem>
                        <HiOutlineEye />
                        Detail
                      </DropdownMenuItem>
                    </Link>
                    <Link
                      to="/belanja/spp/$sppId/edit"
                      params={{ sppId: String(item.id) }}
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
          {spp.length === 0 && (
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
