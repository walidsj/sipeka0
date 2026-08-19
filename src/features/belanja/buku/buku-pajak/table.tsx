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
import { keepPreviousData } from "@tanstack/react-query";
import React from "react";
import { HiOutlineChevronDoubleDown, HiOutlinePencil } from "react-icons/hi";
import { Link, getRouteApi } from "@tanstack/react-router";
import { MonthFilter, defaultDateRange } from "@/components/month-filter";
import { useAuth } from "@/lib/auth";

const routeApi = getRouteApi("/_dashboard/belanja/buku/buku-pajak/");

export default function BkPajakTable() {
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const { user } = useAuth();
  const tahun = user?.tahun ?? "2026";

  const startDate = search["startDate"] || defaultDateRange(tahun).startDate;
  const endDate = search["endDate"] || defaultDateRange(tahun).endDate;

  const { data: belanja } = api.belanja.getAllBkPajak.useQuery(
    {
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    },
    { placeholderData: keepPreviousData, suspense: true },
  );

  if (!belanja) return <div>Data tidak dapat dimuat.</div>;

  let no = 0;
  let saldo = 0;
  let totalPenerimaan = 0;
  let totalPengeluaran = 0;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center gap-5">
        <MonthFilter
          startDate={startDate}
          endDate={endDate}
          tahun={tahun}
          onChange={(range) =>
            navigate({ search: (prev) => ({ ...prev, ...range }) })
          }
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1">No.</TableHead>
            <TableHead className="text-center">Tanggal Dokumen</TableHead>
            <TableHead className="text-center">Nomor Dokumen</TableHead>
            <TableHead>Uraian</TableHead>
            <TableHead className="text-center">Kode Billing</TableHead>
            <TableHead>NTPN</TableHead>
            <TableHead>Penerimaan</TableHead>
            <TableHead>Pengeluaran</TableHead>
            <TableHead>Saldo</TableHead>
            <TableHead className="w-1" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {belanja.map((blj) => {
            return blj.potonganBelanja.map((item, index) => {
              totalPenerimaan += Number(item.jumlah);

              if (item.ntpn) {
                totalPengeluaran += Number(item.jumlah);
              }

              return (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell className="text-center">{++no}.</TableCell>
                    <TableCell className="text-center">
                      {Intl.DateTimeFormat("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }).format(
                        blj.tglDokumen ? new Date(blj.tglDokumen) : new Date(),
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {blj.noDokumen}
                    </TableCell>
                    <TableCell>
                      Pemotongan {item.jenis} {blj.uraian}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.billing}
                    </TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-right">
                      {formatAngka(item.jumlah)}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">
                      {formatAngka((saldo += Number(item.jumlah)))}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            Aksi <HiOutlineChevronDoubleDown className="ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <Link
                            to="/belanja/perekaman/$belanjaId/potongan/$potonganId/edit"
                            params={{
                              belanjaId: String(blj.id),
                              potonganId: String(item.id),
                            }}
                          >
                            <DropdownMenuItem>
                              <HiOutlinePencil className="mr-2" />
                              Edit
                            </DropdownMenuItem>
                          </Link>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell>
                      Penyetoran {item.jenis}{" "}
                      {blj.rekanan && `a.n. ${blj.rekanan.nama}`}
                      {blj.pegawai &&
                        `a.n. ${blj.pegawai.gelarDepan && `${blj.pegawai.gelarDepan} `}${blj.pegawai.nama}${
                          blj.pegawai.gelarBelakang &&
                          `, ${blj.pegawai.gelarBelakang}`
                        }`}
                    </TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center">{item.ntpn}</TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">
                      {formatAngka(item.ntpn ? item.jumlah : 0)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatAngka(
                        item.ntpn ? (saldo -= Number(item.jumlah)) : saldo,
                      )}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </React.Fragment>
              );
            });
          })}
          {belanja.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableHead colSpan={6}>Total</TableHead>
            <TableHead className="text-right">
              {formatAngka(totalPenerimaan)}
            </TableHead>
            <TableHead className="text-right">
              {formatAngka(totalPengeluaran)}
            </TableHead>
            <TableHead className="text-right">{formatAngka(saldo)}</TableHead>
            <TableHead />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
