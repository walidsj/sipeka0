import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { formatAngka, formatTanggal, getBendahara } from "@/lib/utils";
import { api } from "@/trpc/react";
import { keepPreviousData } from "@tanstack/react-query";
import React from "react";
import { getRouteApi } from "@tanstack/react-router";
import { useReactToPrint } from "react-to-print";
import { MonthFilter, defaultDateRange } from "@/components/month-filter";
import { useAuth } from "@/lib/auth";

const routeApi = getRouteApi("/_dashboard/belanja/spp/cetak/");

export default function SppRegisterTable() {
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  const { user } = useAuth();
  const tahun = user?.tahun ?? "2026";
  const startDate = search["startDate"] || defaultDateRange(tahun).startDate;
  const endDate = search["endDate"] || defaultDateRange(tahun).endDate;

  const { data: spp } = api.spp.getAll.useQuery(
    { startDate, endDate },
    { placeholderData: keepPreviousData, suspense: true },
  );

  if (!spp) return <div>Data tidak dapat dimuat.</div>;

  const totalJumlah = spp.data.reduce((acc, item) => acc + Number(item.jumlah), 0);

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
          style={{ fontSize: "8pt" }}
          className="font-serif leading-4"
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
                  <div style={{ fontSize: "10pt" }} className="font-bold uppercase">
                    Pemerintah Provinsi Kalimantan Timur
                  </div>
                  <div style={{ fontSize: "10pt" }} className="font-bold uppercase">
                    BLUD RSJD ATMA HUSADA MAHAKAM
                  </div>
                  <div style={{ fontSize: "10pt" }} className="font-bold uppercase">
                    TAHUN ANGGARAN {tahun}
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
            REGISTER SPP
          </h5>
          <h4
            style={{ fontSize: "9pt" }}
            className="text-center font-bold uppercase"
          >
            BENDAHARA PENGELUARAN BLUD
          </h4>
          <h6 className="mb-5 text-center">
            Periode {formatTanggal(startDate)} s.d. {formatTanggal(endDate)}
          </h6>
          <table className="w-full">
            <thead
              style={{ display: "table-header-group" }}
              className="border-b-2 border-double border-black bg-black text-white"
            >
              <tr>
                <th className="w-8 border border-black px-2 py-1 text-center">
                  No.
                </th>
                <th className="border border-black px-2 py-1 text-center">
                  Nomor Dokumen
                </th>
                <th className="border border-black px-2 py-1 text-center">
                  Tanggal Dokumen
                </th>
                <th className="border border-black px-2 py-1">Uraian Dokumen</th>
                <th className="border border-black px-2 py-1 text-center">
                  Jumlah
                  <br />
                  (Rp)
                </th>
              </tr>
            </thead>
            <tbody className="border-b-2 border-double border-black">
              {spp.data.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-black"
                  style={{ pageBreakInside: "avoid" }}
                >
                  <td className="border-x border-black px-2 py-0.5 text-center">
                    {index + 1}.
                  </td>
                  <td className="border-x border-black px-2 py-0.5 text-center">
                    {item.noDokumen}
                  </td>
                  <td className="border-x border-black px-2 py-0.5 text-center">
                    {item.tglDokumen &&
                      Intl.DateTimeFormat("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }).format(new Date(item.tglDokumen))}
                  </td>
                  <td className="border-x border-black px-2 py-0.5">
                    {item.uraian}
                  </td>
                  <td className="border-x border-black px-2 py-0.5 text-right">
                    {formatAngka(item.jumlah)}
                  </td>
                </tr>
              ))}
              {spp.data.length === 0 && (
                <tr>
                  <td colSpan={100} className="py-1 text-center">
                    Tidak ada data
                  </td>
                </tr>
              )}
              <tr className="border-t-2 border-double border-black bg-amber-100 font-semibold">
                <th
                  colSpan={4}
                  className="border-x border-black px-2 py-1 text-left"
                >
                  Total
                </th>
                <th className="border-x border-black px-2 py-1 text-right">
                  {formatAngka(totalJumlah)}
                </th>
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
              <div>Samarinda, {formatTanggal(endDate)}</div>
              <div>Bendahara Pengeluaran BLUD</div>
              <div className="mt-14 font-bold">{getBendahara(endDate).nama}</div>
              <div>{getBendahara(endDate).nip}</div>
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