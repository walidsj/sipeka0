import { Spinner } from "@/components/ui/spinner";
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
import { api } from "@/trpc/react";
import { keepPreviousData } from "@tanstack/react-query";
import _ from "lodash";
import React from "react";
import toast from "react-hot-toast";
import { FiChevronsDown, FiEdit, FiTrash } from "react-icons/fi";
import { Link, useParams } from "@tanstack/react-router";

export default function RincianRabTable() {
  const params = useParams({ strict: false }) as Record<string, string>;

  const rincianRbaBelanja = api.rincianRbaBelanja.getByAktivitasRbaId.useQuery(
    parseInt(params.aktivitasRbaId ?? ""),
    { placeholderData: keepPreviousData },
  );

  const deleteRincianRbaBelanja = api.rincianRbaBelanja.deleteById.useMutation({
    onMutate() {
      toast.loading("Menghapus data...");
    },
    onSuccess(data) {
      toast.dismiss();
      toast.success(data.message);
      rincianRbaBelanja.refetch();
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  const groupedData = _.chain(rincianRbaBelanja.data)
    .groupBy((item) => `${item.rekening?.kode}||${item.rekening?.uraian}`)
    .value();

  let total = 0;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1 text-center">No.</TableHead>
          <TableHead>Uraian</TableHead>
          <TableHead className="text-center">Volume</TableHead>
          <TableHead>Satuan</TableHead>
          <TableHead className="text-right">Harga Satuan</TableHead>
          <TableHead className="text-right">Jumlah</TableHead>
          <TableHead className="w-1" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {rincianRbaBelanja.isLoading && (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              <Spinner />
            </TableCell>
          </TableRow>
        )}
        {rincianRbaBelanja.isSuccess &&
          groupedData &&
          Object.keys(groupedData).map((key) => {
            const totalPerGroup = groupedData[key].reduce(
              (acc, curr) => acc + Number(curr.volume) * Number(curr.harga),
              0,
            );
            return (
              <React.Fragment key={key}>
                <TableRow className="bg-blue-50 hover:bg-blue-100">
                  <TableCell colSpan={5}>
                    <span className="mr-3 inline-block font-bold">
                      {key.split("||")[0]}
                    </span>
                    <span className="font-semibold">{key.split("||")[1]}</span>
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {Number(totalPerGroup).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell />
                </TableRow>
                {groupedData[key].map((item, index) => {
                  total += Number(item.volume) * Number(item.harga);

                  return (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">
                        {index + 1}.
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold">{item.rab?.uraian}</p>
                        {item.rab?.spesifikasi && (
                          <p className="mt-1 text-xs text-gray-500">
                            <span className="text-primary mr-1 inline-block font-medium">
                              Spesifikasi :
                            </span>{" "}
                            {item.rab?.spesifikasi}
                          </p>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {Number(item.volume).toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.satuan}
                      </TableCell>
                      <TableCell className="text-right">
                        {Number(item.harga).toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {Number(
                          Number(item.volume) * Number(item.harga),
                        ).toLocaleString("id-ID")}
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
                              to="/anggaran/rba/penyusunan-rba/$rbaId/aktivitas/$aktivitasRbaId/rincian-rba/rab/$rincianRbaBelanjaId/edit"
                              params={{
                                rbaId: params.rbaId,
                                aktivitasRbaId: params.aktivitasRbaId,
                                rincianRbaBelanjaId: String(item.id),
                              }}
                            >
                              <DropdownMenuItem>
                                <FiEdit />
                                Edit
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                              onClick={() => {
                                if (
                                  confirm(
                                    "Apakah anda yakin menghapus data ini?",
                                  )
                                ) {
                                  deleteRincianRbaBelanja.mutate(item.id);
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
                  );
                })}
              </React.Fragment>
            );
          })}
        {rincianRbaBelanja.isSuccess &&
          rincianRbaBelanja.data?.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        {rincianRbaBelanja.isError && (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              {rincianRbaBelanja.error.message}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableHead colSpan={5}>Total</TableHead>
          <TableHead className="text-right">
            {Number(total).toLocaleString("id-ID")}
          </TableHead>
          <TableHead />
        </TableRow>
      </TableFooter>
    </Table>
  );
}
