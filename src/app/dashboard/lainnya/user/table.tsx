import Loading from "@/components/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { keepPreviousData } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiChevronsDown, FiEdit, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function UserTable() {
  const auth = useAuth();

  const user = api.user.getAll.useQuery(undefined, {
    placeholderData: keepPreviousData,
  });

  const deleteUser = api.user.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      toast.success(data.message);
      user.refetch();
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
          <TableHead className="w-1 text-center">Role</TableHead>
          <TableHead>Instansi</TableHead>
          <TableHead>Profil Pegawai</TableHead>
          <TableHead className="w-1" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {user.isLoading && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              <Loading />
            </TableCell>
          </TableRow>
        )}
        {user.isSuccess &&
          user.data?.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell>{item.nama}</TableCell>
              <TableCell className="text-center">
                <Badge className={cn(item.role === "ADMIN" && "bg-red-400")}>
                  {item.role}
                </Badge>
              </TableCell>
              <TableCell>{item.instansi}</TableCell>
              <TableCell>
                {item.pegawai ? (
                  <div className="flex w-full items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={`https://ui-avatars.com/api/?name=${item.pegawai?.nama}&background=${item.role == "ADMIN" ? "E64B4B" : "0D8ABC"}&color=fff`}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-left text-sm">
                        {item.pegawai?.gelarDepan &&
                          `${item.pegawai?.gelarDepan} `}
                        {item.pegawai?.nama}
                        {item.pegawai?.gelarBelakang &&
                          `, ${item.pegawai?.gelarBelakang}`}
                      </p>
                      <p className="text-left text-xs font-normal text-slate-400">
                        {item.pegawai?.jabatan}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>Belum Terkoneksi</div>
                )}
              </TableCell>
              <TableCell>
                {auth.user?.role === "ADMIN" && (
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
                          if (
                            confirm("Apakah anda yakin menghapus data ini?")
                          ) {
                            deleteUser.mutate(item.id);
                          }
                        }}
                        className="text-red-500"
                      >
                        <FiTrash className="mr-2" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        {user.isSuccess && user.data?.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Tidak ada data
            </TableCell>
          </TableRow>
        )}
        {user.isError && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              {user.error.message}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
