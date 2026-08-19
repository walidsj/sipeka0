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
import { formatAngkaDecimal, formatTanggal, terbilang } from "@/lib/utils";
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
        <CardTitle>Cetak SPTJM</CardTitle>
        <CardDescription>Dokumen SPTJM SPM</CardDescription>
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
              className="text-center font-serif font-bold uppercase underline"
            >
              Surat Pernyataan Tanggung Jawab Mutlak SPM-
              {spm.spp.lpjBelanja?.jenis}
            </h5>
            <h4 className="mb-5 text-center font-serif">
              Nomor: 900.1.3.5/{spm.noDokumen}/{spm.spp.lpjBelanja?.jenis}
              /SPTJM-SPM/RSJD-AHM/BLUD
            </h4>
            <p className="mb-2 text-justify indent-[1cm] font-serif">
              Sehubungan dengan Surat Perintah Membayar{" "}
              {spm.spp.lpjBelanja?.jenis === "LS"
                ? "Langsung"
                : spm.spp.lpjBelanja?.jenis === "GU"
                  ? "Ganti Uang Persediaan"
                  : spm.spp.lpjBelanja?.jenis === "TU"
                    ? "Tambah Uang Persediaan"
                    : ""}{" "}
              (SPM-{spm.spp.lpjBelanja?.jenis}) BLUD Nomor 900.1.3.5/
              {spm.noDokumen}/{spm.spp.lpjBelanja?.jenis}
              /SPM/RSJD-AHM/BLUD tanggal {formatTanggal(spm.tglDokumen)} yang
              saya ajukan sebesar Rp{" "}
              {formatAngkaDecimal(
                spm.spp.lpjBelanja?.belanja.reduce(
                  (acc, item) => acc + Number(item.jumlah),
                  0,
                ),
              )}{" "}
              (terbilang{" "}
              {terbilang(
                spm.spp.lpjBelanja?.belanja.reduce(
                  (acc, item) => acc + Number(item.jumlah),
                  0,
                ),
              )}{" "}
              Rupiah) untuk keperluan RSJD Atma Husada Mahakam Prov. Kaltim
              Tahun Anggaran{" "}
              {Intl.DateTimeFormat("id", {
                year: "numeric",
              }).format(spm.tglDokumen ? new Date(spm.tglDokumen) : new Date())}
              , dengan ini menyatakan dengan sebenarnya bahwa:
            </p>
            <ol className="mb-2 list-outside list-decimal pl-[1cm]">
              <li className="text-justify font-serif">
                Jumlah{" "}
                {spm.spp.lpjBelanja?.jenis === "LS"
                  ? "Langsung"
                  : spm.spp.lpjBelanja?.jenis === "GU"
                    ? "Ganti Uang Persediaan"
                    : spm.spp.lpjBelanja?.jenis === "TU"
                      ? "Tambah Uang Persediaan"
                      : ""}{" "}
                ({spm.spp.lpjBelanja?.jenis}) tersebut di atas akan dipergunakan
                untuk keperluan belanja kegiatan yang akan kami laksanakan
                sesuai DPA-SKPD BLUD.
              </li>
              <li className="text-justify font-serif">
                Bukti-bukti belanja tersebut disimpan di RSJD Atma Husada
                Mahakam Prov. Kaltim sesuai dengan ketentuan yang berlaku untuk
                keperluan pemeriksaan Internal/Eksternal sebagai Bukti
                Pertanggungjawaban Keuangan.
              </li>
            </ol>
            <p className="mb-2 text-justify indent-[1cm] font-serif">
              Dengan ini, saya menyatakan bertanggung jawab penuh atas segala
              pengeluaran yang dibayar lunas sesuai dengan ketentuan peraturan
              perundangan yang berlaku.
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
                  Kuasa Pengguna Anggaran
                </div>
                <div className="mt-12 font-serif leading-4 underline">
                  dr. Indah Puspitasari, MARS
                </div>
                <div className="font-serif leading-4">Pembina Utama Muda</div>
                <div className="font-serif leading-4">
                  NIP. 196705301998032003
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
  "/_dashboard/belanja/spm/$spmId/cetak-sptjm/",
)({
  component: Page,
});
