import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  endOfMonth,
  format,
  getDaysInMonth,
  startOfMonth,
  subMonths,
} from "date-fns";
import { id } from "date-fns/locale";
import React from "react";
import { HiOutlineChevronDoubleDown, HiOutlinePencil } from "react-icons/hi";
import { Link, useSearchParams } from "react-router-dom";

// Generate daftar bulan dari Januari 2026 sampai bulan ini
function generateMonthOptions() {
  const options: { label: string; value: string }[] = [];
  const now = new Date();
  const start = new Date(2026, 0, 1); // Januari 2026
  let cursor = start;
  while (cursor <= now) {
    options.push({
      label: format(cursor, "MMMM yyyy", { locale: id }),
      value: format(cursor, "yyyy-MM"),
    });
    cursor = subMonths(cursor, -1);
  }
  return options.reverse(); // terbaru di atas
}

const MONTH_OPTIONS = generateMonthOptions();

export default function BkPajakTable() {
  const [searchParams, setSearchParams] = useSearchParams({
    startDate: "",
    endDate: "",
  });

  const startDate =
    searchParams.get("startDate") || format(new Date(), "yyyy-MM-01");
  const endDate =
    searchParams.get("endDate") || format(new Date(), "yyyy-MM-dd");

  // Tentukan nilai month picker: cocok jika startDate adalah awal bulan
  // dan endDate adalah akhir bulan tersebut
  const selectedMonth = (() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const isFullMonth =
      start.getDate() === 1 &&
      end.getDate() === getDaysInMonth(start) &&
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear();
    return isFullMonth ? format(start, "yyyy-MM") : "custom";
  })();

  function setMonth(yearMonth: string) {
    const date = new Date(yearMonth + "-01");
    const start = format(startOfMonth(date), "yyyy-MM-dd");
    const end = format(endOfMonth(date), "yyyy-MM-dd");
    searchParams.set("startDate", start);
    searchParams.set("endDate", end);
    setSearchParams(searchParams);
  }

  const {
    data: belanja,
  } = api.belanja.getAllBkPajak.useQuery(
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
        <div className="flex flex-wrap items-center gap-2">
          {/* Pilih bulan cepat */}
          <Select
            value={selectedMonth}
            onValueChange={(val) => {
              if (val !== "custom") setMonth(val);
            }}
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Pilih bulan" />
            </SelectTrigger>
            <SelectContent>
              {selectedMonth === "custom" && (
                <SelectItem value="custom" disabled>
                  Rentang kustom
                </SelectItem>
              )}
              {MONTH_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Atau pilih rentang manual */}
          <span className="text-muted-foreground text-sm">atau</span>
          <Input
            value={startDate}
            type="date"
            className="w-40"
            onChange={(e) => {
              searchParams.set("startDate", e.target.value);
              setSearchParams(searchParams);
            }}
          />
          <span className="text-muted-foreground text-sm">s.d.</span>
          <Input
            type="date"
            value={endDate}
            className="w-40"
            onChange={(e) => {
              searchParams.set("endDate", e.target.value);
              setSearchParams(searchParams);
            }}
          />
        </div>
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
                            to={`/sipeka/belanja/perekaman/${blj.id}/potongan/${item.id}/edit`}
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
                      {blj.rekanan &&
                        `a.n. ${blj.rekanan.nama}`}
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
