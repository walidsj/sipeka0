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
import { formatAngkaDecimal, formatTanggal, terbilang } from "@/lib/utils";
import NotFound from "@/components/not-found";
const routeApi = getRouteApi(
  "/_dashboard/belanja/spp/$sppId/cetak-surat-pengantar/",
);

function Page() {
  const params = routeApi.useParams();

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cetak Surat Pengantar</CardTitle>
        <CardDescription>Dokumen Surat Pengantar SPP</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border p-10 shadow">
          <div
            style={{
              fontSize: "10pt",
            }}
            className="leading-4"
            ref={componentRef}
          >
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
            <table className="mt-3 w-full">
              <tbody>
                <tr>
                  <td className="w-16 font-serif">
                    <img
                      src="/images/logo-kaltimprov.webp"
                      className="h-20 w-24"
                    />
                  </td>
                  <td className="text-center">
                    <div
                      style={{ fontSize: "12pt" }}
                      className="font-serif leading-5 font-bold uppercase"
                    >
                      Pemerintah Provinsi Kalimantan Timur
                    </div>
                    <div
                      style={{ fontSize: "14pt" }}
                      className="font-serif leading-5 font-bold uppercase"
                    >
                      Dinas Kesehatan
                    </div>
                    <div
                      style={{ fontSize: "14pt" }}
                      className="font-serif leading-5 font-bold uppercase"
                    >
                      Rumah Sakit Jiwa Daerah Atma Husada Mahakam
                    </div>
                    <div className="font-serif">
                      Jl. Kakap No. 23 Samarinda Telp (0541) 743364 Fax 741035
                    </div>
                    <div className="font-serif">
                      Website: rsjdahm.kaltimprov.go.id | Posel:
                      rsjdahm@kaltimprov.go.id
                    </div>
                  </td>
                  <td className="w-16"></td>
                </tr>
              </tbody>
            </table>
            <hr className="mt-3 mb-5 border-b-4 border-double border-black" />
            <div className="mb-5 flex w-full flex-row">
              <div className="w-full font-serif">
                <br />
                Yth. Kuasa Pengguna Anggaran
                <br />
                RSJD Atma Husada Mahakam
                <br />
                di —
                <br />
                <span className="ml-6 font-serif underline">Samarinda</span>
              </div>
              <div className="w-3/5 text-justify font-serif">
                Samarinda, {formatTanggal(spp.tglDokumen)}
              </div>
            </div>
            <h5
              style={{ fontSize: "12pt" }}
              className="text-center font-serif font-bold uppercase underline"
            >
              Surat Pengantar
            </h5>
            <h4 className="mb-5 text-center font-serif">
              Nomor: 900.1.3.5/{spp.noDokumen}/{spp.lpjBelanja?.jenis}
              /SPP/RSJD-AHM/BLUD
            </h4>
            <table className="mb-5 w-[calc(100%-2px)]">
              <thead>
                <tr>
                  <td className="w-10 border border-black px-3 py-3 text-center font-serif uppercase">
                    No
                  </td>
                  <td className="w-auto border border-black px-3 py-3 text-center font-serif uppercase">
                    Uraian
                  </td>
                  <td className="w-1/4 border border-black px-3 py-3 text-center font-serif uppercase">
                    Banyaknya
                  </td>
                  <td className="w-auto border border-black px-3 py-3 text-center font-serif uppercase">
                    Keterangan
                  </td>
                </tr>
                <tr className="italic">
                  <td className="border border-black px-3 text-center font-serif uppercase">
                    1
                  </td>
                  <td className="border border-black px-3 text-center font-serif uppercase">
                    2
                  </td>
                  <td className="border border-black px-3 text-center font-serif uppercase">
                    3
                  </td>
                  <td className="border border-black px-3 text-center font-serif uppercase">
                    4
                  </td>
                </tr>
              </thead>
              <tbody>
                <td className="border border-black px-3 pt-2 pb-5 text-center align-top font-serif">
                  1.
                </td>
                <td className="border border-black px-3 pt-2 pb-5 text-justify align-top font-serif">
                  Surat Permintaan Pembayaran{" "}
                  {spp.lpjBelanja?.jenis === "LS"
                    ? "Langsung"
                    : spp.lpjBelanja?.jenis === "GU"
                      ? "Ganti Uang Persediaan"
                      : spp.lpjBelanja?.jenis === "TU"
                        ? "Tambah Uang Persediaan"
                        : ""}{" "}
                  (SPP-
                  {spp.lpjBelanja?.jenis}) BLUD Rumah Sakit Jiwa Daerah Atma
                  Husada Mahakam Prov. Kaltim untuk Tahun Anggaran{" "}
                  {Intl.DateTimeFormat("id-ID", { year: "numeric" }).format(
                    new Date(spp.tglDokumen!),
                  )}{" "}
                  senilai{" "}
                  <span className="font-serif font-semibold">
                    Rp
                    {formatAngkaDecimal(
                      spp.lpjBelanja?.belanja?.reduce(
                        (acc, curr) => acc + Number(curr.jumlah),
                        0,
                      ),
                    )}
                  </span>{" "}
                  (
                  {terbilang(
                    spp.lpjBelanja?.belanja?.reduce(
                      (acc, curr) => acc + Number(curr.jumlah),
                      0,
                    ) || 0,
                  )}{" "}
                  Rupiah )
                </td>
                <td className="border border-black px-3 pt-2 pb-5 text-center align-top font-serif">
                  1 (satu) berkas
                </td>
                <td className="border border-black px-3 pt-2 pb-5 text-justify align-top font-serif">
                  Disampaikan dengan hormat untuk dapat diproses penerbitan
                  Surat Perintah Membayar (SPM) BLUD
                </td>
              </tbody>
            </table>
            <p className="mb-5 font-serif">
              Demikian disampaikan, atas kerjasamanya diucapkan terima kasih.
            </p>
            <div className="mb-5 flex w-full flex-row">
              <div className="w-full" />
              <div className="w-3/5 text-justify font-serif">
                <div className="font-serif">
                  Bendahara Pengeluaran Pembantu BLUD,
                </div>
                <div className="mt-14 font-serif underline">
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
  "/_dashboard/belanja/spp/$sppId/cetak-surat-pengantar/",
)({
  component: Page,
});
