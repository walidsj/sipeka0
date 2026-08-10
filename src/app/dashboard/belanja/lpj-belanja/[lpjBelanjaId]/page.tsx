import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "@/trpc/react";
import Loading from "@/components/loading";

import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  HiOutlineChevronDown,
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlinePrinter,
  HiOutlineTrash,
} from "react-icons/hi";
import BelanjaEmptyLpjTable from "./table";
import { formatTanggal } from "@/lib/utils";
import NotFound from "@/app/not-found";

export default function EditPage() {
  const params = useParams<{ lpjBelanjaId: string }>();
  const utils = api.useUtils();
  const navigate = useNavigate();

  const {
    data: lpjBelanja,
    isError,
    isLoading,
  } = api.lpjBelanja.getById.useQuery(Number(params.lpjBelanjaId));

  const deleteItem = api.lpjBelanja.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      navigate(-1);
      utils.lpjBelanja.invalidate();
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  if (isLoading) return <Loading />;

  if (isError) return <NotFound />;

  if (!lpjBelanja) return <NotFound />;

  return (
    <Card>
      <div className="mb-5 flex flex-row items-center justify-between px-6 pt-6">
        <CardHeader className="p-0">
          <CardTitle>Detail LPJ Belanja</CardTitle>
          <CardDescription>Data untuk detail LPJ Belanja</CardDescription>
        </CardHeader>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Aksi <HiOutlineChevronDown className="ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <Link to="tambah-belanja">
              <DropdownMenuItem>
                <HiOutlinePlus className="mr-2" />
                Tambah Belanja
              </DropdownMenuItem>
            </Link>
            <Link to="edit">
              <DropdownMenuItem>
                <HiOutlinePencil className="mr-2" />
                Edit
              </DropdownMenuItem>
            </Link>
            <Link to="cetak">
              <DropdownMenuItem>
                <HiOutlinePrinter className="mr-2" />
                Cetak
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (confirm("Apakah anda yakin menghapus data ini?")) {
                  deleteItem.mutate(Number(params.lpjBelanjaId));
                }
              }}
              className="text-red-500"
            >
              <HiOutlineTrash className="mr-2" />
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CardContent>
        <div className="flex flex-row items-center gap-4">
          <img src="/images/icons/research.png" className="h-16" />
          <div>
            <CardDescription>Dokumen LPJ Belanja</CardDescription>
            <CardTitle>{lpjBelanja.noDokumen}</CardTitle>
            <CardDescription>
              tanggal {formatTanggal(lpjBelanja.tglDokumen)}
            </CardDescription>
            <CardDescription>{lpjBelanja.uraian}</CardDescription>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <BelanjaEmptyLpjTable />
      </CardContent>
    </Card>
  );
}
