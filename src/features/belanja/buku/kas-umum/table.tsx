import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatAngkaDecimal, formatTanggal, terbilang } from "@/lib/utils";
import { api } from "@/trpc/react";
import { keepPreviousData } from "@tanstack/react-query";
import React from "react";
import { getRouteApi } from "@tanstack/react-router";
import { useReactToPrint } from "react-to-print";
import { MonthFilter, defaultDateRange } from "@/components/month-filter";
import { useAuth } from "@/lib/auth";

const routeApi = getRouteApi("/_dashboard/belanja/buku/kas-umum/");

export default function BkuTable() {
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({ contentRef: componentRef });
  const { user } = useAuth();
  const tahun = user?.tahun ?? "2026";

  const startDate = search["startDate"] || defaultDateRange(tahun).startDate;
  const endDate = search["endDate"] || defaultDateRange(tahun).endDate;

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
        <MonthFilter
          startDate={startDate}
          endDate={endDate}
          tahun={tahun}
          onChange={(range) =>
            navigate({ search: (prev) => ({ ...prev, ...range }) })
          }
        />
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
            {formatTanggal(startDate)} s.d. {formatTanggal(endDate)}
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
