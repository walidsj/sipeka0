import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { api } from "@/trpc/react";
import { Spinner } from "@/components/ui/spinner";
import { useReactToPrint } from "react-to-print";
import React from "react";
import { Button } from "@/components/ui/button";
import NotFound from "@/app/not-found";
import { formatAngkaDecimal, formatTanggal, terbilang } from "@/lib/utils";

export default function Page() {
  const params = useParams<{ sppId: string }>();

  const {
    data: spp,
    isError,
    isLoading,
  } = api.spp.getById.useQuery(Number(params.sppId));

  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  if (isLoading) return <Spinner />;

  if (isError) return <NotFound />;

  if (!spp) return <NotFound />;

  const uniqueRekening = Array(
    ...new Set(spp.lpjBelanja?.belanja?.map((item) => item.rab?.kodeRekening)),
  ).sort();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cetak SPP Rincian</CardTitle>
        <CardDescription>Dokumen SPP Rincian</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border p-10 shadow">
          <div className="text-[9pt] leading-4" ref={componentRef}>
            <style type="text/css" media="print">
              {`
                                @page {
                                    size: A4 portrait;
                                    margin-top: 1cm;
                                    margin-left: 1.5cm;
                                    margin-right: 1.5cm;
                                    margin-bottom: 1cm;

                                }
                            `}
            </style>
            <div className="mb-5 w-full">
              <div className="text-center font-serif text-[11pt] leading-[15pt] font-semibold uppercase">
                Provinsi Kalimantan Timur
              </div>
              <div className="text-center font-serif text-[11pt] leading-[15pt] font-semibold uppercase">
                Dinas Kesehatan
              </div>
              <div className="text-center font-serif text-base leading-[15pt] font-semibold uppercase">
                Rumah Sakit Jiwa Daerah Atma Husada Mahakam
              </div>
              <div className="mt-3 text-center font-serif text-[12pt] leading-[15pt] font-semibold uppercase">
                Surat Permintaan Pembayaran (SPP)
              </div>
              <div className="text-center font-serif text-[10pt]">
                Nomor: 900.1.3.5/{spp.noDokumen}/{spp.lpjBelanja?.jenis}
                /SPP/RSJD-AHM/BLUD
              </div>
              <div className="mt-2 text-center font-serif text-[10pt]">
                Tahun Anggaran{" "}
                {Intl.DateTimeFormat("id-ID", {
                  year: "numeric",
                }).format(
                  spp.tglDokumen ? new Date(spp.tglDokumen) : new Date(),
                )}
              </div>
            </div>
            <div className="mb-5 text-center font-serif text-[11pt] leading-[15pt] font-semibold uppercase">
              Rincian Rencana Penggunaan
            </div>
            <table className="mb-2 w-[calc(100%-2px)]">
              <thead>
                <tr>
                  <th className="w-[1%] border-[0.5pt] border-black px-3 py-2 font-serif">
                    No
                  </th>
                  <th className="w-[15%] border-[0.5pt] border-black px-3 py-2 font-serif">
                    Kode Rekening
                  </th>
                  <th className="w-[64%] border-[0.5pt] border-black px-3 py-2 font-serif">
                    Uraian
                  </th>
                  <th className="w-[20%] border-[0.5pt] border-black px-3 py-2 font-serif">
                    Jumlah
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-orange-100 font-semibold">
                  <td className="border-[0.5pt] border-black px-3 py-1 text-center align-top font-serif">
                    1.
                  </td>
                  <td
                    colSpan={3}
                    className="border-[0.5pt] border-black px-3 py-1 align-top font-serif"
                  >
                    Nomor SPD: DPA/A.1/1.02.0.00.0.00.01.0000/001/2025
                  </td>
                </tr>
                <tr className="font-semibold">
                  <td className="border-[0.5pt] border-black px-3 py-1 text-center align-top font-serif">
                    2.
                  </td>
                  <td
                    colSpan={3}
                    className="border-[0.5pt] border-black px-3 py-1 align-top font-serif"
                  >
                    1.02.01.1.10 Peningkatan Pelayanan BLUD
                  </td>
                </tr>
                <tr className="font-semibold">
                  <td className="border-[0.5pt] border-black px-3 py-1 text-center align-top font-serif">
                    3.
                  </td>
                  <td
                    colSpan={3}
                    className="border-[0.5pt] border-black px-3 py-1 align-top font-serif"
                  >
                    1.02.01.1.10.0001 Pelayanan dan Penunjang Pelayanan BLUD
                  </td>
                </tr>

                {uniqueRekening.map((kodeRekening, index) => {
                  const filtered = spp.lpjBelanja?.belanja?.filter(
                    (item) => item.rab?.kodeRekening === kodeRekening,
                  );
                  const total = filtered.reduce(
                    (acc, item) => acc + Number(item.jumlah),
                    0,
                  );

                  return (
                    <tr key={index}>
                      <td className="border-[0.5pt] border-black px-3 py-1 text-center align-top font-serif">
                        {index + 4}.
                      </td>
                      <td className="border-[0.5pt] border-black px-3 py-1 align-top font-serif">
                        {kodeRekening}
                      </td>
                      <td className="border-[0.5pt] border-black px-3 py-1 align-top font-serif">
                        {filtered[0].rab.rekening?.uraian}
                      </td>
                      <td className="border-[0.5pt] border-black px-3 py-1 text-right align-top font-serif">
                        {formatAngkaDecimal(total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-neutral-200">
                  <td
                    colSpan={3}
                    className="border-[0.5pt] border-black px-3 py-1 text-right font-serif font-semibold"
                  >
                    Jumlah:
                  </td>
                  <td className="border-[0.5pt] border-black px-3 py-1 text-right font-serif font-semibold">
                    {formatAngkaDecimal(
                      spp.lpjBelanja?.belanja?.reduce(
                        (acc, item) => acc + Number(item.jumlah),
                        0,
                      ),
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="mb-5 font-serif">
              Terbilang:{" "}
              {terbilang(
                spp.lpjBelanja?.belanja?.reduce(
                  (acc, item) => acc + Number(item.jumlah),
                  0,
                ),
              )}{" "}
              Rupiah
            </div>
            <div className="flex w-full flex-row text-center">
              <div className="w-1/2 font-serif">
                <div className="font-serif">Mengetahui/Menyetujui,</div>
                <div className="font-serif">Kuasa Pengguna Anggaran</div>
                <div className="mt-12 font-serif underline">
                  dr. Indah Puspitasari, MARS
                </div>
                <div className="font-serif">Pembina Utama Muda</div>
                <div className="font-serif">NIP. 196705301998032003</div>
              </div>
              <div className="w-1/2 font-serif">
                <div className="font-serif">
                  Samarinda, {formatTanggal(spp.tglDokumen)}
                </div>
                <div className="font-serif">
                  Bendahara Pengeluaran Pembantu BLUD,
                </div>
                <div className="mt-12 font-serif underline">Moh. Walid Arkham Sani, A.Md.Pnl</div>
                <div className="font-serif">Pengatur</div>
                <div className="font-serif">NIP. 200008062022011001</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => handlePrint()}>Cetak</Button>
      </CardFooter>
    </Card>
  );
}
