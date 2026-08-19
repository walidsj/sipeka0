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
import { getRouteApi } from "@tanstack/react-router";
import ExcelExport from "@/features/akuntansi/lra/$kodeRekening/excel-export";
import { FiFile } from "react-icons/fi";
import { defaultDateRange } from "@/components/month-filter";
import { useAuth } from "@/lib/auth";

const routeApi = getRouteApi("/_dashboard/akuntansi/lra/$kodeRekening/");

export default function DetailTable() {
  const params = routeApi.useParams();
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const { user } = useAuth();
  const tahun = user?.tahun ?? "2026";
  const startDate = search["startDate"] || defaultDateRange(tahun).startDate;
  const endDate = search["endDate"] || defaultDateRange(tahun).endDate;
  const { data: belanja } = api.belanja.getBelanjaLrabyKodeRekening.useQuery(
    {
      kodeRekening: params.kodeRekening!,
      startDate: search["startDate"] || undefined,
      endDate: search["endDate"] || undefined,
    },
    {
      placeholderData: keepPreviousData,
      suspense: true,
    },
  );

  if (!belanja) return <div>Data tidak dapat dimuat.</div>;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center gap-5">
        <div className="flex gap-2">
          <Input
            value={startDate}
            type="date"
            onChange={(e) => {
              navigate({
                search: (prev) => ({ ...prev, startDate: e.target.value }),
              });
            }}
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => {
              navigate({
                search: (prev) => ({ ...prev, endDate: e.target.value }),
              });
            }}
          />
          <ExcelExport
            data={belanja}
            kodeRekening={params.kodeRekening!}
            startDate={new Date(startDate)}
            endDate={new Date(endDate)}
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
