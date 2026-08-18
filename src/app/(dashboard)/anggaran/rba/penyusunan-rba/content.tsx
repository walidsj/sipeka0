import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { keepPreviousData } from "@tanstack/react-query";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { FiArrowRight, FiChevronsDown, FiEdit, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import { id } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/components/loading";

export default function RbaContentList() {
  const rba = api.rba.getAll.useQuery(
    {},
    { placeholderData: keepPreviousData },
  );

  const deleteRba = api.rba.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      toast.success(data.message);
      rba.refetch();
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {rba.isLoading && (
        <div className="col-span-3">
          <Loading />
        </div>
      )}
      {rba.isSuccess &&
        rba.data?.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{item.uraian}</CardTitle>
              <CardDescription>
                No. {item.noDokumen} tanggal{" "}
                {format(String(item.tglDokumen), "dd MMMM yyyy", {
                  locale: id,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button asChild>
                  <Link to={`${item.id}/aktivitas`}>
                    Rincian
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
                        if (confirm("Apakah anda yakin menghapus data ini?")) {
                          deleteRba.mutate(item.id);
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
            </CardContent>
          </Card>
        ))}
      {rba.isSuccess && rba.data?.length === 0 && (
        <div className="col-span-3">Tidak ada data</div>
      )}
      {rba.isError && <div className="col-span-3">{rba.error.message}</div>}
    </div>
  );
}
