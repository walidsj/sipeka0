import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "@tanstack/react-router";
import { api } from "@/trpc/react";
import { Spinner } from "@/components/ui/spinner";
import { useReactToPrint } from "react-to-print";
import React from "react";
import { Button } from "@/components/ui/button";
import { formatTanggal } from "@/lib/utils";
import NotFound from "@/components/not-found";

function Page() {
  const params = useParams({ strict: false }) as Record<string, string>;

  const {
    data: spm,
    isError,
    isLoading,
  } = api.spm.getById.useQuery(Number(params.spmId));

  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  if (isLoading) return <Spinner />;

  if (isError) return <NotFound />;

  if (!spm) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cetak Surat Pernyataan Verifikasi</CardTitle>
        <CardDescription>
          Dokumen Surat Pernyataan Verifikasi SPM
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border p-10 shadow">
          <div className="text-[10pt] leading-[14pt]" ref={componentRef}>
            <style type="text/css" media="print">
              {`
                                @page {
                                    size: A4 portrait;
                                    margin-top: 1.5cm;
                                    margin-left: 2cm;
                                    margin-right: 2cm;
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
            <h5
              style={{ fontSize: "12pt" }}
              className="mb-5 text-center font-serif font-bold uppercase"
            >
              SURAT PERNYATAAN
              <br />
              VERIFIKASI KELENGKAPAN DAN KEABSAHAN
              <br /> DOKUMEN DAN LAMPIRAN SPP-
              {spm.spp.lpjBelanja?.jenis}
            </h5>
            <p className="mb-2 text-justify font-serif">
              Saya yang bertanda tangan di bawah ini:
            </p>
            <table className="mb-2 w-full">
              <tbody>
                <tr>
                  <td className="font-serif">Nama</td>
                  <td className="font-serif">:</td>
                  <td className="font-serif">Sopia Lena, S.E, M.Si</td>
                </tr>
                <tr>
                  <td className="font-serif">NIP</td>
                  <td className="font-serif">:</td>
                  <td className="font-serif">197804061997032003</td>
                </tr>
                <tr>
                  <td className="font-serif">Jabatan</td>
                  <td className="font-serif">:</td>
                  <td className="font-serif">
                    Pejabat Penatausahaan Keuangan BLUD (PPK-BLUD)
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="mb-2 text-justify indent-[1cm] font-serif">
              Menyataan dengan sesungguhnya bahwa dokumen dan lampiran Surat
              Permintaan Pembayaran {spm.spp.lpjBelanja?.jenis} Nomor 900.1.3.5/
              {spm.spp.noDokumen}/{spm.spp.lpjBelanja?.jenis}
              /SPP/RSJD-AHM/BLUD, tanggal{" "}
              {formatTanggal(spm.spp.tglDokumen || new Date())} telah lengkap
              dan sah sesuai ketentuan peraturan perundang-undangan. Jika di
              kemudian hari pernyataan saya ini tidak benar, maka saya bersedia
              menerima sanksi sesuai peraturan yang berlaku.
            </p>
            <p className="mb-5 text-justify indent-[1cm] font-serif">
              Demikian surat pernyataan ini dibuat untuk melengkapi persyaratan
              pengajuan SPM-
              {spm.spp.lpjBelanja?.jenis} SKPD kami.
            </p>
            <div className="mb-5 flex w-full flex-row">
              <div className="w-full" />
              <div className="w-3/5 text-justify font-serif">
                <div className="font-serif">
                  Samarinda, {formatTanggal(spm.tglDokumen)}
                </div>
                <div className="font-serif leading-4">
                  Pejabat Penatausahaan Keuangan BLUD
                </div>
                <div className="mt-12 font-serif leading-4 underline">
                  Sopia Lena, S.E, M.Si
                </div>
                <div className="font-serif leading-4">Pembina</div>
                <div className="font-serif leading-4">
                  NIP. 197804061997032003
                </div>
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
  "/_dashboard/belanja/spm/$spmId/cetak-pernyataan-verifikasi/",
)({
  component: Page,
});
