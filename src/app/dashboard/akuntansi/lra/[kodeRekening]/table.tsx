import Loading from "@/components/loading";
import { Input } from "@/components/ui/input";
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
import { keepPreviousData } from "@tanstack/react-query";
import { format } from "date-fns";
import { useParams, useSearchParams } from "react-router-dom";
import ExcelExport from "./excel-export";
import { FiFile } from "react-icons/fi";

export default function DetailTable() {
  const params = useParams<{ kodeRekening: string }>();
  const [searchParams, setSearchParams] = useSearchParams({
    startDate: "",
    endDate: "",
  });

  const {
    isLoading,
    isError,
    error,
    data: belanja,
  } = api.belanja.getBelanjaLrabyKodeRekening.useQuery(
    {
      kodeRekening: params.kodeRekening!,
      startDate: searchParams.get("startDate") || undefined,
      endDate: searchParams.get("endDate") || undefined,
    },
    {
      placeholderData: keepPreviousData,
    },
  );

  if (isLoading) return <Loading />;

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (!belanja) return <div>Data tidak dapat dimuat.</div>;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center gap-5">
        <div className="flex gap-2">
          <Input
            value={
              searchParams.get("startDate") || format(new Date(), "yyyy-01-01")
            }
            type="date"
            onChange={(e) => {
              searchParams.set("startDate", e.target.value);
              setSearchParams(searchParams);
            }}
          />
          <Input
            type="date"
            value={
              searchParams.get("endDate") || format(new Date(), "yyyy-MM-dd")
            }
            onChange={(e) => {
              searchParams.set("endDate", e.target.value);
              setSearchParams(searchParams);
            }}
          />
          <ExcelExport
            data={belanja}
            kodeRekening={params.kodeRekening!}
            startDate={new Date(searchParams.get("startDate")!)}
            endDate={new Date(searchParams.get("endDate")!)}
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead className="text-center">Tanggal Dokumen</TableHead>
            <TableHead className="text-center">Kode Rekening</TableHead>
            <TableHead>Nomor Dokumen</TableHead>
            <TableHead>Penerima</TableHead>
            <TableHead>Uraian</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead>Dokumen LPJ</TableHead>
            <TableHead>File</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {belanja.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="text-center">{index + 1}.</TableCell>
                <TableCell className="text-center font-semibold">
                  {Intl.DateTimeFormat("id", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }).format(new Date(item.tglDokumen || ""))}
                </TableCell>
                <TableCell className="text-center font-semibold">
                  {item.rab?.kodeRekening}
                </TableCell>
                <TableCell className="text-center font-semibold">
                  {item.noDokumen}
                </TableCell>
                <TableCell className="font-semibold">
                  {item.rekanan && item.rekanan.nama}
                  {item.pegawai &&
                    `${item.pegawai.gelarDepan && `${item.pegawai.gelarDepan} `}${item.pegawai.nama}${
                      item.pegawai.gelarBelakang &&
                      `, ${item.pegawai.gelarBelakang}`
                    }`}
                </TableCell>
                <TableCell className="font-semibold">{item.uraian}</TableCell>
                <TableCell className="text-right font-semibold">
                  {formatAngka(item.jumlah)}
                </TableCell>
                <TableCell className="font-semibold">
                  {item.lpjBelanja?.jenis} {item.lpjBelanja?.noDokumen}
                </TableCell>
                <TableCell>
                  {item.file && (
                    <a
                      href={`/api/storage/files/belanja/${item.file}`}
                      target="_blank"
                    >
                      <FiFile className="text-primary inline h-5 w-5" />
                      {item.file}
                    </a>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
          {belanja.length === 0 && (
            <TableRow>
              <TableCell colSpan={100} className="text-center">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="text-right font-semibold">
              Total
            </TableCell>
            <TableCell className="text-right font-semibold">
              {formatAngka(
                belanja.reduce((acc, item) => acc + Number(item.jumlah), 0),
              )}
            </TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
