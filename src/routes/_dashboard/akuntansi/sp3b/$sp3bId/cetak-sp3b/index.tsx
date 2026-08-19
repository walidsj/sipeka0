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
import {
  formatAngkaDecimal,
  formatAngkaRomawi,
  formatTanggal,
} from "@/lib/utils";
import NotFound from "@/components/not-found";
const routeApi = getRouteApi("/_dashboard/akuntansi/sp3b/$sp3bId/cetak-sp3b/");

function Page() {
  const params = routeApi.useParams();

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
        <CardTitle>Cetak SP3B</CardTitle>
        <CardDescription>Dokumen SP3B</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border p-10 shadow">
          <div
            style={{
              fontSize: "9pt",
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
            <table className="mt-3 w-[calc(100%-2px)]">
              <tbody>
                <tr>
                  <td className="w-2/12 border-[0.5pt] border-black px-3 py-2 font-serif">
                    <img
                      src="/images/logo-kaltimprov.webp"
                      className="mx-auto h-20 w-16"
                    />
                  </td>
                  <td className="w-10/12 border-[0.5pt] border-black px-3 py-2 align-top">
                    <div
                      style={{
                        fontSize: "11pt",
                        fontFamily: "Inter Variable",
                      }}
                      className="mb-1 text-center font-bold uppercase"
                    >
                      Pemerintah Provinsi Kalimantan Timur
                    </div>

                    <div
                      style={{
                        fontSize: "12pt",
                        fontFamily: "Inter Variable",
                      }}
                      className="mb-2 text-center font-bold uppercase"
                    >
                      Surat Permintaan Pengesahan Pendapatan dan Belanja (SP3B)
                    </div>
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                            className="w-1/5"
                          >
                            Nama Sub Unit
                          </td>
                          <td className="w-2">:</td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            Rumah Sakit Jiwa Daerah Atma Husada Mahakam
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            Tanggal
                          </td>
                          <td>:</td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            {formatTanggal(sp3b.tglDokumen)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            Nomor
                          </td>
                          <td>:</td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            {sp3b.noDokumen}
                            /RSJDAHM-BLUD/SP3B/
                            {formatAngkaRomawi(
                              new Date(sp3b.tglSelesai!).getMonth() + 1,
                            )}
                            /{new Date(sp3b.tglDokumen!).getFullYear()}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            Tahun Anggaran
                          </td>
                          <td>:</td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            {Intl.DateTimeFormat("id-ID", {
                              year: "numeric",
                            }).format(new Date(sp3b.tglDokumen!))}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    className="border-[0.5pt] border-black px-3 py-2 align-top"
                  >
                    <p
                      className="mb-4 text-justify"
                      style={{
                        fontFamily: "Inter Variable",
                      }}
                    >
                      Kepala SKPD Rumah Sakit Jiwa Daerah Atma Husada Mahakam
                      memohon kepada Bendahara Umum Daerah selaku PPKD agar
                      mengesahkan dan membukukan pendapatan dan belanja periode{" "}
                      {formatTanggal(sp3b.tglMulai)} s.d.{" "}
                      {formatTanggal(sp3b.tglSelesai)} sejumlah:
                    </p>
                    <table className="mb-5 w-2/3">
                      <tbody>
                        <tr>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                            className="w-5"
                          >
                            a.
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                            colSpan={2}
                          >
                            Saldo Awal
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            Rp
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                            className="text-right"
                          >
                            {formatAngkaDecimal(sp3b.saldoAwal)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            b.
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                            colSpan={2}
                          >
                            Pendapatan
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            Rp
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                            className="text-right"
                          >
                            {formatAngkaDecimal(sp3b.pendapatan.total)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            c.
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                            colSpan={2}
                          >
                            Belanja
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            Rp
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                            className="text-right"
                          >
                            {formatAngkaDecimal(
                              sp3b.belanja.pegawai +
                                sp3b.belanja.barjas +
                                sp3b.belanja.modal,
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                            className="w-5"
                          >
                            1.
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            Belanja Pegawai
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            Rp
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                            className="text-right"
                          >
                            {formatAngkaDecimal(sp3b.belanja.pegawai)}
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            2.
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            Belanja Barang dan Jasa
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            Rp
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                            className="text-right"
                          >
                            {formatAngkaDecimal(sp3b.belanja.barjas)}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-3"></td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            3.
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            Belanja Modal Peralatan dan Mesin
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            Rp
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                            className="text-right"
                          >
                            {formatAngkaDecimal(sp3b.belanja.modal)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            d.
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            Saldo Akhir
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                          >
                            Rp
                          </td>
                          <td
                            style={{
                              fontFamily: "Inter Variable",
                            }}
                            className="text-right"
                          >
                            {formatAngkaDecimal(
                              sp3b.saldoAwal +
                                sp3b.pendapatan.total -
                                (sp3b.belanja.pegawai +
                                  sp3b.belanja.barjas +
                                  sp3b.belanja.modal),
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    className="border-[0.5pt] border-black px-3 py-2"
                  >
                    <div className="flex w-full">
                      <div className="w-2/3"></div>
                      <div className="w-1/3">
                        <div
                          style={{
                            fontFamily: "Inter Variable",
                          }}
                        >
                          Samarinda, {formatTanggal(sp3b.tglDokumen)}
                        </div>
                        <div
                          style={{
                            fontFamily: "Inter Variable",
                          }}
                        >
                          {sp3b.penandatangan?.jabatan},
                        </div>
                        <div
                          style={{
                            fontFamily: "Inter Variable",
                          }}
                          className="mt-14 underline"
                        >
                          {sp3b.penandatangan?.gelarDepan &&
                            `${sp3b.penandatangan?.gelarDepan} `}
                          {sp3b.penandatangan?.nama}
                          {sp3b.penandatangan?.gelarBelakang &&
                            `, ${sp3b.penandatangan?.gelarBelakang}`}
                        </div>
                        <div
                          style={{
                            fontFamily: "Inter Variable",
                          }}
                        >
                          Pembina Utama Muda
                        </div>
                        <div
                          style={{
                            fontFamily: "Inter Variable",
                          }}
                        >
                          NIP. {sp3b.penandatangan?.nip}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
  "/_dashboard/akuntansi/sp3b/$sp3bId/cetak-sp3b/",
)({
  component: Page,
});
