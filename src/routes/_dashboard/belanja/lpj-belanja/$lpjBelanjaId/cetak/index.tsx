import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {} from "@tanstack/react-router";
import { api } from "@/trpc/react";
import { Spinner } from "@/components/ui/spinner";
import { useReactToPrint } from "react-to-print";
import React from "react";
import { Button } from "@/components/ui/button";
import NotFound from "@/components/not-found";
import { formatAngkaDecimal, formatTanggal } from "@/lib/utils";
import { potonganBelanjaSchema } from "#server/schema/belanja.schema";
const routeApi = getRouteApi(
  "/_dashboard/belanja/lpj-belanja/$lpjBelanjaId/cetak/",
);

function Page() {
  const params = routeApi.useParams();

  const { data: lpjBelanja } = api.lpjBelanja.getById.useQuery(
    Number(params.lpjBelanjaId),
  );

  const {
    isLoading,
    isError,
    data: belanja,
  } = api.lpjBelanja.getBelanjaByLpjBelanjaId.useQuery(
    Number(params.lpjBelanjaId),
  );

  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  if (isLoading) return <Spinner />;

  if (isError) return <NotFound />;

  if (!belanja) return <NotFound />;

  const potonganList = potonganBelanjaSchema.shape.jenis.options;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cetak LPJ Belanja</CardTitle>
        <CardDescription>Dokumen LPJ Belanja</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border p-10 shadow">
          <div className="text-[7.5pt] leading-[10pt]" ref={componentRef}>
            <style type="text/css" media="print">
              {`
                                @page {
                                    size: A4 landscape;
                                    margin-top: 1cm;
                                    margin-left: 1cm;
                                    margin-right: 1cm;
                                    margin-bottom: 1cm;

                                }
                            `}
            </style>
            <div className="mb-2 w-full">
              <div className="text-center font-serif text-[9pt] leading-[11pt] font-semibold uppercase">
                Provinsi Kalimantan Timur
              </div>
              <div className="text-center font-serif text-[9pt] leading-[11pt] font-semibold uppercase">
                Dinas Kesehatan
              </div>
              <div className="text-center font-serif text-[10pt] leading-[12pt] font-semibold uppercase">
                Rumah Sakit Jiwa Daerah Atma Husada Mahakam
              </div>
              <div className="mt-5 text-center font-serif text-[10pt] leading-[12pt] font-semibold uppercase">
                Laporan Pertanggungjawaban{" "}
                {lpjBelanja?.jenis === "LS"
                  ? "Langsung"
                  : lpjBelanja?.jenis === "GU"
                    ? "Ganti Uang Persediaan"
                    : lpjBelanja?.jenis === "TU"
                      ? "Tambah Uang Persediaan"
                      : ""}{" "}
              </div>
              <div className="mb-5 text-center font-serif text-[10pt] leading-[12pt]">
                Nomor: 900.1.3.5/{lpjBelanja?.noDokumen}/{lpjBelanja?.jenis}
                /LPJ/RSJD-AHM/BLUD
              </div>
            </div>
            <table className="mb-2 w-[calc(100%-2px)]">
              <thead>
                <tr>
                  <th
                    rowSpan={2}
                    className="w-[1%] border-[0.5pt] border-black px-2 py-2 font-serif uppercase"
                  >
                    No
                  </th>
                  <th
                    rowSpan={2}
                    className="w-[5%] border-[0.5pt] border-black px-2 py-2 font-serif uppercase"
                  >
                    Kode Rekening
                  </th>
                  <th
                    rowSpan={2}
                    className="w-[4%] border-[0.5pt] border-black px-2 py-2 font-serif uppercase"
                  >
                    Nomor Bukti
                  </th>
                  <th
                    rowSpan={2}
                    className="w-[5%] border-[0.5pt] border-black px-2 py-2 font-serif uppercase"
                  >
                    Tanggal
                  </th>
                  <th
                    rowSpan={2}
                    className="border-[0.5pt] border-black px-2 py-2 font-serif uppercase"
                  >
                    Uraian
                  </th>
                  <th
                    rowSpan={2}
                    className="w-[5%] border-[0.5pt] border-black px-2 py-2 font-serif uppercase"
                  >
                    Jumlah
                  </th>
                  <th
                    colSpan={potonganList.length}
                    className="border-[0.5pt] border-black px-2 py-2 font-serif uppercase"
                  >
                    Potongan
                  </th>
                  <th
                    rowSpan={2}
                    className="w-[5%] border-[0.5pt] border-black px-2 py-2 font-serif uppercase"
                  >
                    Jumlah Potongan
                  </th>
                </tr>
                <tr>
                  {potonganList.map((item) => (
                    <th
                      key={item}
                      className="w-[5%] border-[0.5pt] border-black px-2 py-2 font-serif text-nowrap uppercase"
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {belanja.map((item, index) => (
                  <tr>
                    <td className="border-[0.5pt] border-black px-2 py-1 text-center align-top font-serif">
                      {index + 1}.
                    </td>
                    <td className="border-[0.5pt] border-black px-2 py-1 text-center align-top font-serif">
                      {item.rab?.kodeRekening}
                    </td>
                    <td className="border-[0.5pt] border-black px-2 py-1 text-center align-top font-serif">
                      {item.noDokumen}
                    </td>
                    <td className="border-[0.5pt] border-black px-2 py-1 text-center align-top font-serif">
                      {Intl.DateTimeFormat("id", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }).format(new Date(item.tglDokumen || new Date()))}
                    </td>
                    <td className="border-[0.5pt] border-black px-2 py-1 align-top font-serif">
                      {item.uraian}
                    </td>
                    <td className="border-[0.5pt] border-black px-2 py-1 text-right align-top font-serif">
                      {formatAngkaDecimal(item.jumlah)}
                    </td>
                    {potonganList.map((potongan) => (
                      <td className="border-[0.5pt] border-black px-2 py-1 text-right align-top font-serif">
                        {formatAngkaDecimal(
                          item.potonganBelanja
                            .filter(
                              (potonganBelanja) =>
                                potonganBelanja.jenis === potongan,
                            )
                            .reduce(
                              (acc, curr) => acc + Number(curr.jumlah),
                              0,
                            ),
                        )}
                      </td>
                    ))}
                    <td className="border-[0.5pt] border-black px-2 py-1 text-right align-top font-serif">
                      {formatAngkaDecimal(
                        item.potonganBelanja.reduce(
                          (acc, curr) => acc + Number(curr.jumlah),
                          0,
                        ),
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <th
                    colSpan={5}
                    className="border-[0.5pt] border-black px-2 py-2 font-serif uppercase"
                  >
                    Jumlah
                  </th>
                  <th className="border-[0.5pt] border-black px-2 py-2 text-right font-serif uppercase">
                    {formatAngkaDecimal(
                      belanja.reduce(
                        (acc, curr) => acc + Number(curr.jumlah),
                        0,
                      ),
                    )}
                  </th>
                  {potonganList.map((potongan) => (
                    <th className="border-[0.5pt] border-black px-2 py-2 text-right font-serif uppercase">
                      {formatAngkaDecimal(
                        belanja
                          .map((item) =>
                            item.potonganBelanja.map((potonganBelanja) =>
                              potonganBelanja.jenis === potongan
                                ? Number(potonganBelanja.jumlah)
                                : 0,
                            ),
                          )
                          .reduce(
                            (acc, curr) =>
                              acc + curr.reduce((acc, curr) => acc + curr, 0),
                            0,
                          ),
                      )}
                    </th>
                  ))}
                  <th className="border-[0.5pt] border-black px-2 py-2 text-right font-serif uppercase">
                    {formatAngkaDecimal(
                      belanja
                        .map((item) =>
                          item.potonganBelanja.reduce(
                            (acc, curr) => acc + Number(curr.jumlah),
                            0,
                          ),
                        )
                        .reduce((acc, curr) => acc + curr, 0),
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
            <div className="mt-5 flex w-full flex-nowrap text-center">
              <div className="w-1/3">
                <div className="font-serif">Menyetujui:</div>
                <div className="font-serif">Kuasa Pengguna Anggaran</div>
                <div className="mt-14 font-serif font-bold">
                  dr. Indah Puspitasari, MARS
                </div>
                <div className="font-serif">Pembina Utama Muda</div>
                <div className="font-serif">NIP. 196705301998032003</div>
              </div>
              <div className="w-1/3">
                <div className="font-serif">Mengetahui:</div>
                <div className="font-serif">PPTK BLUD</div>
                <div className="mt-14 font-serif font-bold">Sudoto, S.Kom</div>
                <div className="font-serif">Pembina</div>
                <div className="font-serif">NIP. 197407291994021002</div>
              </div>
              <div className="w-1/3">
                <div className="font-serif">
                  Samarinda,{" "}
                  {formatTanggal(lpjBelanja?.tglDokumen || new Date())}
                </div>
                <div className="font-serif">
                  Bendahara Pengeluaran Pembantu BLUD
                </div>
                <div className="mt-14 font-serif font-bold">
                  Moh. Walid Arkham Sani, A.Md.Pnl
                </div>
                <div className="font-serif">Pengatur Tk. I</div>
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

export const Route = createFileRoute(
  "/_dashboard/belanja/lpj-belanja/$lpjBelanjaId/cetak/",
)({
  component: Page,
});
