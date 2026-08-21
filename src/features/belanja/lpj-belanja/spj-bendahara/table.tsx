import { cn, formatAngka, formatTanggal, getBendahara } from "@/lib/utils";
import { api } from "@/trpc/react";
import { keepPreviousData } from "@tanstack/react-query";
import React from "react";
import { useReactToPrint } from "react-to-print";
import { MonthFilter } from "@/components/month-filter";
import { useAuth } from "@/lib/auth";
import { getRouteApi } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const routeApi = getRouteApi(
  "/_dashboard/belanja/lpj-belanja/$lpjBelanjaId/spj-bendahara/",
);

type SpjItem = {
  kodeRekening: string;
  uraian: string;
  anggaran: number;
  lsPegawai: { bulanLalu: number; bulanIni: number; sdBulanIni: number };
  lsBarangJasa: { bulanLalu: number; bulanIni: number; sdBulanIni: number };
  lsModal: { bulanLalu: number; bulanIni: number; sdBulanIni: number };
  nonLs: { bulanLalu: number; bulanIni: number; sdBulanIni: number };
  jumlahSpj: number;
  sisaAnggaran: number;
};

export default function SpjBendaharaTable() {
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  const { user } = useAuth();
  const tahun = user?.tahun ?? "2026";
  const startDate = search["startDate"] || `${tahun}-01-01`;
  const endDate = search["endDate"] || `${tahun}-12-31`;

  const { data } = api.belanja.getSpjBendahara.useQuery(
    { startDate, endDate },
    { placeholderData: keepPreviousData, suspense: true },
  );

  if (!data) return <div>Data tidak dapat dimuat.</div>;

  const sumField = (items: SpjItem[], field: keyof SpjItem) =>
    items.reduce((acc, item) => acc + Number(item[field] ?? 0), 0);

  const sumSub = (
    items: SpjItem[],
    key: keyof Pick<
      SpjItem,
      "lsPegawai" | "lsBarangJasa" | "lsModal" | "nonLs"
    >,
    sub: "bulanLalu" | "bulanIni" | "sdBulanIni",
  ) => items.reduce((acc, item) => acc + Number(item[key][sub] ?? 0), 0);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between gap-5">
        <MonthFilter
          startDate={startDate}
          endDate={endDate}
          tahun={tahun}
          onChange={(range) =>
            navigate({ search: (prev) => ({ ...prev, ...range }) })
          }
        />
        <Button variant="outline" onClick={handlePrint}>
          Cetak
        </Button>
      </div>
      <div className="overflow-x-auto rounded-md border p-10 shadow">
        <div
          style={{ fontSize: "8pt" }}
          className="font-serif leading-4"
          ref={componentRef}
        >
          <style type="text/css" media="print">
            {`
              @page {
                size: A4 landscape;
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
          <div className="mb-2 w-full">
            <div className="text-center font-serif text-[10pt] leading-[12pt] font-semibold uppercase">
              Surat Pertanggungjawaban Bendahara Pengeluaran
            </div>
            <div className="mb-5 text-center font-serif text-[9pt] leading-[11pt]">
              Periode: {startDate} s.d {endDate}
            </div>
          </div>
          <table className="mb-2 w-[calc(100%-2px)]">
            <thead>
              <tr>
                <th rowSpan={2} className="border-[0.5pt] border-black px-2 py-2 font-serif uppercase">
                  Kode Rekening
                </th>
                <th rowSpan={2} className="border-[0.5pt] border-black px-2 py-2 font-serif uppercase">
                  Uraian
                </th>
                <th rowSpan={2} className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  Anggaran (Rp)
                </th>
                <th colSpan={3} className="border-[0.5pt] border-black px-2 py-2 font-serif text-center uppercase">
                  SPJ - LS Pegawai
                </th>
                <th colSpan={3} className="border-[0.5pt] border-black px-2 py-2 font-serif text-center uppercase">
                  SPJ - LS Barang dan Jasa
                </th>
                <th colSpan={3} className="border-[0.5pt] border-black px-2 py-2 font-serif text-center uppercase">
                  SPJ - LS Modal
                </th>
                <th colSpan={3} className="border-[0.5pt] border-black px-2 py-2 font-serif text-center uppercase">
                  SPJ - UP/GU/TU
                </th>
                <th rowSpan={2} className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  Jumlah SPJ (LS + UP/GU/TU) s.d Bulan Ini
                </th>
                <th rowSpan={2} className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  Sisa Anggaran (Rp)
                </th>
              </tr>
              <tr>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  s.d Bulan Lalu
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  Bulan Ini
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  s.d Bulan Ini
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  s.d Bulan Lalu
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  Bulan Ini
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  s.d Bulan Ini
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  s.d Bulan Lalu
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  Bulan Ini
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  s.d Bulan Ini
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  s.d Bulan Lalu
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  Bulan Ini
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  s.d Bulan Ini
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="border-[0.5pt] border-black px-2 py-1 font-serif">
                    {item.kodeRekening}
                  </td>
                  <td className="border-[0.5pt] border-black px-2 py-1 font-serif">
                    {item.uraian}
                  </td>
                  <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif font-semibold">
                    {formatAngka(item.anggaran)}
                  </td>
                  {/* LS Pegawai */}
                  <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif">
                    {formatAngka(item.lsPegawai.bulanLalu)}
                  </td>
                  <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif">
                    {formatAngka(item.lsPegawai.bulanIni)}
                  </td>
                  <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif font-semibold">
                    {formatAngka(item.lsPegawai.sdBulanIni)}
                  </td>
                  {/* LS Barang dan Jasa */}
                  <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif">
                    {formatAngka(item.lsBarangJasa.bulanLalu)}
                  </td>
                  <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif">
                    {formatAngka(item.lsBarangJasa.bulanIni)}
                  </td>
                  <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif font-semibold">
                    {formatAngka(item.lsBarangJasa.sdBulanIni)}
                  </td>
                  {/* LS Modal */}
                  <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif">
                    {formatAngka(item.lsModal.bulanLalu)}
                  </td>
                  <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif">
                    {formatAngka(item.lsModal.bulanIni)}
                  </td>
                  <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif font-semibold">
                    {formatAngka(item.lsModal.sdBulanIni)}
                  </td>
                  {/* UP/GU/TU */}
                  <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif">
                    {formatAngka(item.nonLs.bulanLalu)}
                  </td>
                  <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif">
                    {formatAngka(item.nonLs.bulanIni)}
                  </td>
                  <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif font-semibold">
                    {formatAngka(item.nonLs.sdBulanIni)}
                  </td>
                  {/* Jumlah SPJ */}
                  <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif font-semibold">
                    {formatAngka(item.jumlahSpj)}
                  </td>
                  {/* Sisa Anggaran */}
                  <td className={cn("border-[0.5pt] border-black px-2 py-1 text-right font-serif font-semibold", item.sisaAnggaran < 0 && "text-red-500")}>
                    {formatAngka(item.sisaAnggaran)}
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={17} className="border-[0.5pt] border-black px-2 py-2 text-center font-serif">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={2} className="border-[0.5pt] border-black px-2 py-2 font-serif text-left uppercase">
                  Total
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  {formatAngka(sumField(data, "anggaran"))}
                </th>
                {/* LS Pegawai total */}
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  {formatAngka(sumSub(data, "lsPegawai", "bulanLalu"))}
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  {formatAngka(sumSub(data, "lsPegawai", "bulanIni"))}
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  {formatAngka(sumSub(data, "lsPegawai", "sdBulanIni"))}
                </th>
                {/* LS Barang dan Jasa total */}
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  {formatAngka(sumSub(data, "lsBarangJasa", "bulanLalu"))}
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  {formatAngka(sumSub(data, "lsBarangJasa", "bulanIni"))}
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  {formatAngka(sumSub(data, "lsBarangJasa", "sdBulanIni"))}
                </th>
                {/* LS Modal total */}
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  {formatAngka(sumSub(data, "lsModal", "bulanLalu"))}
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  {formatAngka(sumSub(data, "lsModal", "bulanIni"))}
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  {formatAngka(sumSub(data, "lsModal", "sdBulanIni"))}
                </th>
                {/* UP/GU/TU total */}
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  {formatAngka(sumSub(data, "nonLs", "bulanLalu"))}
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  {formatAngka(sumSub(data, "nonLs", "bulanIni"))}
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  {formatAngka(sumSub(data, "nonLs", "sdBulanIni"))}
                </th>
                {/* Jumlah SPJ total */}
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  {formatAngka(sumField(data, "jumlahSpj"))}
                </th>
                {/* Sisa Anggaran total */}
                <th className="border-[0.5pt] border-black px-2 py-2 font-serif text-right uppercase">
                  {formatAngka(sumField(data, "sisaAnggaran"))}
                </th>
              </tr>
            </tfoot>
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
    </div>
  );
}
