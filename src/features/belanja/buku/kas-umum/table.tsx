import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatAngkaDecimal, formatTanggal, terbilang } from "@/lib/utils";
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
import { useSearch, useNavigate } from "@tanstack/react-router";
import { useReactToPrint } from "react-to-print";

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

export default function BkuTable() {
  const search = useSearch({ strict: false }) as Record<string, string>;
  const navigate = useNavigate();
  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  const startDate = search["startDate"] || format(new Date(), "yyyy-MM-01");
  const endDate = search["endDate"] || format(new Date(), "yyyy-MM-dd");

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
    navigate({
      search: (prev) =>
        ({
          ...(prev as Record<string, string>),
          startDate: start,
          endDate: end,
        }) as never,
    });
  }

  const { data: jurnal } = api.belanja.getBelanjaBku.useQuery(
    {
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    },
    { placeholderData: keepPreviousData, suspense: true },
  );

  if (!jurnal) {
    return <div>Data tidak dapat dimuat.</div>;
  }

  let saldoPenerimaan = 0;
  let saldoPengeluaran = 0;
  let saldo = 0;

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
              navigate({
                search: (prev) =>
                  ({
                    ...(prev as Record<string, string>),
                    startDate: e.target.value,
                  }) as never,
              });
            }}
          />
          <span className="text-muted-foreground text-sm">s.d.</span>
          <Input
            type="date"
            value={endDate}
            className="w-40"
            onChange={(e) => {
              navigate({
                search: (prev) =>
                  ({
                    ...(prev as Record<string, string>),
                    endDate: e.target.value,
                  }) as never,
              });
            }}
          />
        </div>
      </div>
      <div className="rounded-md border p-10 shadow">
        <div
          style={{
            fontSize: "8pt",
          }}
          className="leading-4 font-serif"
          ref={componentRef}
        >
          <style type="text/css" media="print">
            {`
                            @page {
                                size: landscape;
                                margin-top: 1cm;
                                margin-left: 1.5cm;
                                margin-right: 1.5cm;
                                margin-bottom: 1cm;

                            }
                        `}
          </style>
          <table className="my-3 w-full">
            <tbody>
              <tr>
                <td className="w-20">
                  <img
                    src="/images/logo-kaltimprov.webp"
                    className="h-16 w-auto"
                  />
                </td>
                <td className="text-left">
                  <div
                    style={{ fontSize: "10pt" }}
                    className="font-bold uppercase"
                  >
                    Pemerintah Provinsi Kalimantan Timur
                  </div>
                  <div
                    style={{ fontSize: "10pt" }}
                    className="font-bold uppercase"
                  >
                    BLUD RSJD ATMA HUSADA MAHAKAM
                  </div>
                  <div
                    style={{ fontSize: "10pt" }}
                    className="font-bold uppercase"
                  >
                    TAHUN ANGGARAN 2026
                  </div>
                </td>
                <td className="w-16"></td>
              </tr>
            </tbody>
          </table>
          <h5
            style={{ fontSize: "11pt" }}
            className="text-center font-bold uppercase"
          >
            BUKU KAS UMUM
          </h5>
          <h4
            style={{ fontSize: "9pt" }}
            className="text-center font-bold uppercase"
          >
            BENDAHARA PENGELUARAN BLUD
          </h4>
          <h6 className="mb-5 text-center">
            Periode{" "}
            {formatTanggal(
              search["startDate"] || format(new Date(), "yyyy-MM-01"),
            )}{" "}
            s.d. {formatTanggal(search["endDate"] || new Date())}
          </h6>
          <table
            className="my-5 w-[calc(100%-2px)]"
            style={{
              pageBreakInside: "auto",
            }}
          >
            <thead
              style={{
                display: "table-header-group",
              }}
              className="border-b-2 border-double border-black bg-black text-white"
            >
              <tr>
                <th className="border border-black px-2 py-1 text-center">
                  Tanggal
                </th>
                <th className="border border-black px-2 py-1 text-center">
                  No. Bukti
                </th>
                <th className="border border-black px-2 py-1 text-center">
                  Kode Rekening
                </th>
                <th className="border border-black px-2 py-1">Uraian</th>
                <th className="border border-black px-2 py-1">
                  Penerimaan
                  <br />
                  (Rp)
                </th>
                <th className="border border-black px-2 py-1">
                  Pengeluaran
                  <br />
                  (Rp)
                </th>
                <th className="border border-black px-2 py-1">
                  Saldo
                  <br />
                  (Rp)
                </th>
              </tr>
            </thead>
            <tbody className="border-b-2 border-double border-black">
              <tr className="bg-amber-100 font-semibold">
                <td className="border border-black px-2 py-0.5"></td>
                <td className="border border-black px-2 py-0.5"></td>
                <td className="border border-black px-2 py-0.5"></td>
                <td className="border border-black px-2 py-0.5 text-right">
                  Saldo Sebelumnya
                </td>
                <td className="border border-black px-2 py-0.5 text-right">
                  {formatAngkaDecimal(
                    (saldoPenerimaan +=
                      jurnal.meta.totalLastPeriode.penerimaan),
                  )}
                </td>
                <td className="border border-black px-2 py-0.5 text-right">
                  {formatAngkaDecimal(
                    (saldoPengeluaran +=
                      jurnal.meta.totalLastPeriode.pengeluaran),
                  )}
                </td>
                <td className="border border-black px-2 py-0.5 text-right">
                  {formatAngkaDecimal(
                    (saldo +=
                      jurnal.meta.totalLastPeriode.penerimaan -
                      jurnal.meta.totalLastPeriode.pengeluaran),
                  )}
                </td>
              </tr>
              {jurnal.data.map((item, index) => {
                saldoPenerimaan += item.penerimaan || 0;
                saldoPengeluaran += item.pengeluaran || 0;
                return (
                  <tr
                    key={index}
                    className="border-t border-black"
                    style={{
                      pageBreakInside: "avoid",
                      pageBreakAfter: "auto",
                    }}
                  >
                    <td className="border-x border-black px-2 py-0.5 text-center align-top">
                      {item.tgl &&
                        Intl.DateTimeFormat("id-ID", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }).format(new Date(item.tgl!))}
                    </td>
                    <td className="border-r border-black px-2 py-0.5 text-center align-top">
                      {item.noDokumen}
                    </td>
                    <td className="border-r border-black px-2 py-0.5 text-center align-top">
                      {item.kodeRekening}
                    </td>
                    <td className="border-r border-black px-2 py-0.5 align-top">
                      {item.uraian}
                    </td>
                    <td className="border-r border-black px-2 py-0.5 text-right align-top">
                      {item.penerimaan !== null &&
                        formatAngkaDecimal(item.penerimaan)}
                    </td>
                    <td className="border-r border-black px-2 py-0.5 text-right align-top">
                      {item.pengeluaran !== null &&
                        formatAngkaDecimal(item.pengeluaran)}
                    </td>
                    <td className="border-r border-black px-2 py-0.5 text-right align-top">
                      {formatAngkaDecimal(
                        (saldo +=
                          Number(item.penerimaan) - Number(item.pengeluaran)),
                      )}
                    </td>
                  </tr>
                );
              })}
              {jurnal.data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={100} className="text-center">
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}
              <tr className="border border-black bg-amber-100 font-semibold">
                <td
                  colSpan={4}
                  className="border-l border-black px-2 py-0.5 text-left"
                >
                  Jumlah s/d saat ini
                </td>
                <td className="border-l border-black px-2 py-0.5 text-right">
                  {formatAngkaDecimal(saldoPenerimaan)}
                </td>
                <td className="border-l border-black px-2 py-0.5 text-right">
                  {formatAngkaDecimal(saldoPengeluaran)}
                </td>
                <td className="border-l border-black px-2 py-0.5 text-right">
                  {formatAngkaDecimal(saldoPenerimaan - saldoPengeluaran)}
                </td>
              </tr>
              <tr className="border border-black bg-amber-100 font-semibold">
                <td
                  colSpan={4}
                  className="border-l border-black px-2 py-0.5 text-left"
                >
                  Jumlah s/d Sebelumnya
                </td>
                <td className="border-l border-black px-2 py-0.5 text-right">
                  {formatAngkaDecimal(jurnal.meta.totalLastPeriode.penerimaan)}
                </td>
                <td className="border-l border-black px-2 py-0.5 text-right">
                  {formatAngkaDecimal(jurnal.meta.totalLastPeriode.pengeluaran)}
                </td>
                <td className="border-l border-black"></td>
              </tr>
              <tr className="border border-black bg-amber-100 font-semibold">
                <td
                  colSpan={4}
                  className="border-l border-black px-2 py-0.5 text-left"
                >
                  Jumlah saat ini
                </td>
                <td className="border-l border-black px-2 py-0.5 text-right">
                  {formatAngkaDecimal(
                    saldoPenerimaan - jurnal.meta.totalLastPeriode.penerimaan,
                  )}
                </td>
                <td className="border-l border-black px-2 py-0.5 text-right">
                  {formatAngkaDecimal(
                    saldoPengeluaran - jurnal.meta.totalLastPeriode.pengeluaran,
                  )}
                </td>
                <td className="border-l border-black px-2 py-0.5 text-right">
                  {formatAngkaDecimal(saldoPenerimaan - saldoPengeluaran)}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="mt-5 w-full">
            <tbody>
              <tr>
                <td className="font-bold">
                  Saldo Kas di Bendahara Pengeluaran BLUD :
                </td>
                <td className="font-bold">
                  Rp {formatAngkaDecimal(saldoPenerimaan - saldoPengeluaran)}
                </td>
              </tr>
              <tr>
                <td className="font-bold">Terbilang :</td>
                <td className="font-bold">
                  {terbilang(saldoPenerimaan - saldoPengeluaran)} rupiah
                </td>
              </tr>
            </tbody>
          </table>
          <table className="mt-5 w-1/3">
            <tbody>
              <tr>
                <td colSpan={5} className="font-bold">
                  Rincian Saldo Kas :
                </td>
              </tr>
              <tr>
                <td className="w-5">1.</td>
                <td>Saldo TU</td>
                <td className="w-5">:</td>
                <td>Rp</td>
                <td className="text-right">
                  {formatAngkaDecimal(saldoPenerimaan - saldoPengeluaran)}
                </td>
              </tr>
              <tr>
                <td className="w-5">2.</td>
                <td>Saldo UP</td>
                <td className="w-5">:</td>
                <td>Rp</td>
                <td className="text-right">
                  {formatAngkaDecimal(
                    saldo - (saldoPenerimaan - saldoPengeluaran),
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-10 flex">
            <div className="w-1/3 text-center">
              <div>Menyetujui:</div>
              <div>Kuasa Pengguna Anggaran BLUD</div>
              <div className="mt-14 font-bold">dr. Indah Puspitasari, MARS</div>
              <div>NIP. 196705301998032003</div>
            </div>
            <div className="w-1/3"></div>
            <div className="w-1/3 text-center">
              <div>
                Samarinda, {formatTanggal(search["endDate"] || new Date())}
              </div>
              <div>Bendahara Pengeluaran BLUD</div>
              <div className="mt-14 font-bold">
                Moh. Walid Arkham Sani, A.Md.Pnl
              </div>
              <div>NIP. 200008062022011001</div>
            </div>
          </div>
        </div>
      </div>
      <CardFooter>
        <Button onClick={() => handlePrint()}>Cetak</Button>
      </CardFooter>
    </div>
  );
}
