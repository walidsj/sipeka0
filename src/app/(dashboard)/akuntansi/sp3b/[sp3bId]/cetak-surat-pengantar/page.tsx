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
import { formatTanggal } from "@/lib/utils";
import NotFound from "@/app/not-found";

export default function Page() {
  const params = useParams<{ sp3bId: string }>();

  const {
    data: sp3b,
    isError,
    isLoading,
  } = api.sp3b.getById.useQuery(Number(params.sp3bId));

  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  if (isLoading) return <Spinner />;

  if (isError) return <NotFound />;

  if (!sp3b) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cetak Surat Pengantar</CardTitle>
        <CardDescription>Dokumen Surat Pengantar SP3B</CardDescription>
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
              <div className="w-full" />
              <div className="w-3/5 text-justify font-serif">
                Samarinda, {formatTanggal(sp3b.tglDokumen)}
                <br />
                <br />
                Kepada
                <br />
                <span className="-ml-6 font-serif">
                  Yth. Gubernur Kalimantan Timur
                </span>
                <br />
                c.q. Kepala Badan Pengelolaan Keuangan dan Aset Daerah
                <br />
                Provinsi Kalimantan Timur
                <br />
                di -
                <br />
                <span className="ml-6 font-serif underline">Samarinda</span>
              </div>
            </div>
            <h5
              style={{ fontSize: "12pt" }}
              className="text-center font-serif font-bold uppercase underline"
            >
              Surat Pengantar
            </h5>
            <h4 className="mb-5 text-center font-serif">
              Nomor: {sp3b.noDokumen}/SP3B-BLUD/RSJD.AHM-KEU
            </h4>
            <table className="mb-5 w-[calc(100%-2px)]">
              <thead>
                <tr>
                  <td className="w-10 border-[0.5pt] border-black px-3 py-3 text-center font-serif uppercase">
                    No
                  </td>
                  <td className="w-auto border-[0.5pt] border-black px-3 py-3 text-center font-serif uppercase">
                    Uraian
                  </td>
                  <td className="w-1/4 border-[0.5pt] border-black px-3 py-3 text-center font-serif uppercase">
                    Banyaknya
                  </td>
                  <td className="w-auto border-[0.5pt] border-black px-3 py-3 text-center font-serif uppercase">
                    Keterangan
                  </td>
                </tr>
                <tr className="italic">
                  <td className="border-[0.5pt] border-black px-3 text-center font-serif uppercase">
                    1
                  </td>
                  <td className="border-[0.5pt] border-black px-3 text-center font-serif uppercase">
                    2
                  </td>
                  <td className="border-[0.5pt] border-black px-3 text-center font-serif uppercase">
                    3
                  </td>
                  <td className="border-[0.5pt] border-black px-3 text-center font-serif uppercase">
                    4
                  </td>
                </tr>
              </thead>
              <tbody>
                <td className="border-[0.5pt] border-black px-3 pt-2 pb-5 text-center align-top font-serif">
                  1.
                </td>
                <td className="border-[0.5pt] border-black px-3 pt-2 pb-5 text-justify align-top font-serif">
                  Bersama ini terlampir Surat Perintah Pengesahan Pendapatan dan
                  Belanja (SP3B) BLUD Rumah Sakit Jiwa Daerah Atma Husada
                  Mahakam untuk {formatTanggal(sp3b.tglMulai)} s.d.{" "}
                  {formatTanggal(sp3b.tglSelesai)} Tahun Anggaran{" "}
                  {Intl.DateTimeFormat("id-ID", { year: "numeric" }).format(
                    new Date(sp3b.tglDokumen!),
                  )}
                </td>
                <td className="border-[0.5pt] border-black px-3 pt-2 pb-5 text-center align-top font-serif">
                  1 (satu) berkas
                </td>
                <td className="border-[0.5pt] border-black px-3 pt-2 pb-5 text-justify align-top font-serif">
                  Disampaikan dengan hormat untuk dapat diproses penerbitan
                  Surat Pengesahan Pendapatan dan Belanja (SP2B)
                </td>
              </tbody>
            </table>
            <p className="mb-5 font-serif">
              Demikian disampaikan, atas kerjasamanya diucapkan terima kasih.
            </p>
            <div className="mb-5 flex w-full flex-row">
              <div className="w-full" />
              <div className="w-3/5 text-justify font-serif">
                <div className="font-serif">{sp3b.penandatangan?.jabatan},</div>
                <div className="mt-14 font-serif underline">
                  {sp3b.penandatangan?.gelarDepan &&
                    `${sp3b.penandatangan?.gelarDepan} `}
                  {sp3b.penandatangan?.nama}
                  {sp3b.penandatangan?.gelarBelakang &&
                    `, ${sp3b.penandatangan?.gelarBelakang}`}
                </div>
                <div className="font-serif">Pembina Utama Muda</div>
                <div className="font-serif">NIP. {sp3b.penandatangan?.nip}</div>
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
