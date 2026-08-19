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
import { formatAngkaDecimal, formatTanggal, terbilang } from "@/lib/utils";
const routeApi = getRouteApi("/_dashboard/belanja/sp2d/$sp2dId/cetak-sp2d/");

function Page() {
  const params = routeApi.useParams();

  const {
    data: sp2d,
    isError,
    isLoading,
  } = api.sp2d.getById.useQuery(Number(params.sp2dId));

  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  if (isLoading) return <Spinner />;

  if (isError) return <NotFound />;

  if (!sp2d) return <NotFound />;

  const uniqueRekening = Array(
    ...new Set(
      sp2d.spm.spp.lpjBelanja?.belanja?.map((item) => item.rab?.kodeRekening),
    ),
  ).sort();

  const uniquePotongan = Array(
    ...new Set(
      sp2d.spm.spp.lpjBelanja?.belanja
        ?.map((item) => item.potonganBelanja.map((potongan) => potongan.jenis))
        .flat(),
    ),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cetak SP2D</CardTitle>
        <CardDescription>Dokumen SP2D</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border p-10 shadow">
          <div className="text-[8pt] leading-[11pt]" ref={componentRef}>
            <style type="text/css" media="print">
              {`
                                @page {
                                    size: A4 potrait;
                                    margin-top: 1cm;
                                    margin-left: 1cm;
                                    margin-right: 1cm;
                                    margin-bottom: 1cm;

                                }
                            `}
            </style>
            <table className="mb-5 w-[calc(100%-2px)]">
              <tbody>
                <tr>
                  <th
                    colSpan={3}
                    rowSpan={3}
                    className="w-[55%] border-[0.5pt] border-black px-3 py-1 font-serif"
                  >
                    <div className="text-center font-serif text-[9pt] leading-[11pt] font-semibold uppercase">
                      Provinsi Kalimantan Timur
                    </div>
                    <div className="text-center font-serif text-[9pt] leading-[11pt] font-semibold uppercase">
                      Dinas Kesehatan
                    </div>
                    <div className="text-center font-serif text-[10pt] leading-[12pt] font-semibold uppercase">
                      Rumah Sakit Jiwa Daerah Atma Husada Mahakam
                    </div>
                  </th>
                  <th
                    colSpan={2}
                    className="w-[45%] border-[0.5pt] border-black px-3 py-1 font-serif text-[10pt] uppercase"
                  >
                    Surat Perintah Pencairan Dana (SP2D)
                  </th>
                </tr>
                <tr>
                  <th
                    colSpan={2}
                    className="border-[0.5pt] border-black px-3 py-1 font-serif"
                  >
                    Nomor:
                  </th>
                </tr>
                <tr>
                  <th
                    colSpan={2}
                    className="border-[0.5pt] border-black px-3 py-1 font-serif"
                  >
                    900.1.3.5/{sp2d.noDokumen}/{sp2d.spm.spp.lpjBelanja.jenis}
                    /SP2D/RSJD-AHM/BLUD
                  </th>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    className="border-[0.5pt] border-black px-3 py-1 align-top font-serif"
                  >
                    <table className="mb-2 w-full">
                      <tbody>
                        <tr>
                          <td className="w-[25%] align-top font-serif">
                            Nomor SPM
                          </td>
                          <td className="w-[1%] align-top font-serif">:</td>
                          <td className="w-[74%] align-top font-serif font-semibold">
                            900.1.3.5/
                            {sp2d.spm.noDokumen}/{sp2d.spm.spp.lpjBelanja.jenis}
                            /SPM/RSJD-AHM/BLUD
                          </td>
                        </tr>
                        <tr>
                          <td className="align-top font-serif">Tanggal</td>
                          <td className="align-top font-serif">:</td>
                          <td className="align-top font-serif font-semibold">
                            {formatTanggal(sp2d.spm.tglDokumen || new Date())}
                          </td>
                        </tr>
                        <tr>
                          <td className="align-top font-serif">SKPD</td>
                          <td className="align-top font-serif">:</td>
                          <td className="align-top font-serif font-semibold">
                            Dinas Kesehatan
                          </td>
                        </tr>
                        <tr>
                          <td className="align-top font-serif">Unit SKPD</td>
                          <td className="align-top font-serif">:</td>
                          <td className="align-top font-serif font-semibold">
                            RSJD Atma Husada Mahakam
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td
                    colSpan={2}
                    className="border-[0.5pt] border-black px-3 py-1 align-top font-serif"
                  >
                    <table className="mb-2 w-full">
                      <tbody>
                        <tr>
                          <td className="w-[30%] align-top font-serif">Dari</td>
                          <td className="w-[1%] align-top font-serif">:</td>
                          <td className="w-[59%] align-top font-serif font-semibold">
                            Kuasa Pengguna Anggaran
                            <br />
                            RSJD Atma Husada Mahakam
                          </td>
                        </tr>
                        <tr>
                          <td className="align-top font-serif">
                            Tahun Anggaran
                          </td>
                          <td className="align-top font-serif">:</td>
                          <td className="align-top font-serif font-semibold">
                            {Intl.DateTimeFormat("id", {
                              year: "numeric",
                            }).format(
                              sp2d.tglDokumen
                                ? new Date(sp2d.tglDokumen)
                                : new Date(),
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={5}
                    className="border-[0.5pt] border-black px-3 py-1 font-serif"
                  >
                    <p className="font-serif">
                      Bank Pengirim:{" "}
                      <strong className="font-serif">
                        PT. BPD KALTIM KALTARA
                      </strong>
                    </p>
                    <p className="text-justify font-serif">
                      Hendaklah mencairkan/memindahbukukan dari baki{" "}
                      <strong className="font-serif">
                        Rekening Nomor 0011536760
                      </strong>{" "}
                      dengan nama rekening BLUD RUMAH SAKIT JIWA DAERAH ATMA
                      HUSADA MAHAKAM
                    </p>
                    <p className="text-justify font-serif">
                      Uang sebesar{" "}
                      <strong className="font-serif">
                        Rp{" "}
                        {formatAngkaDecimal(
                          sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                            (acc, item) => acc + Number(item.jumlah),
                            0,
                          ),
                        )}
                      </strong>{" "}
                      (terbilang:{" "}
                      {terbilang(
                        sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                          (acc, item) => acc + Number(item.jumlah),
                          0,
                        ),
                      )}{" "}
                      Rupiah)
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={5}
                    className="border-[0.5pt] border-black px-3 py-1 font-serif"
                  >
                    <table className="mb-2 w-full">
                      <tbody>
                        <tr>
                          <td className="w-[29%] align-top font-serif">
                            Kepada
                          </td>
                          <td className="w-[1%] align-top font-serif">:</td>
                          <td className="w-[70%] align-top font-serif font-semibold">
                            {(sp2d.spm.spp.lpjBelanja?.jenis === "LS" ||
                              sp2d.spm.spp.lpjBelanja?.jenis === "TU") &&
                              sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.rekanan?.nama)
                                .join(", ")}
                            {(sp2d.spm.spp.lpjBelanja?.jenis === "LS" ||
                              sp2d.spm.spp.lpjBelanja?.jenis === "TU") &&
                              sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.pegawai?.nama)
                                .join(", ")}
                            {(sp2d.spm.spp.lpjBelanja?.jenis === "LS" ||
                              sp2d.spm.spp.lpjBelanja?.jenis === "TU") &&
                              !sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.pegawai?.nama)
                                .join(", ") &&
                              !sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.rekanan?.nama)
                                .join(", ") &&
                              "Moh. Walid Arkham Sani, A.Md.Pnl"}
                            {sp2d.spm.spp.lpjBelanja?.jenis === "GU" &&
                              "Moh. Walid Arkham Sani, A.Md.Pnl"}
                          </td>
                        </tr>
                        <tr>
                          <td className="align-top font-serif">NPWP</td>
                          <td className="align-top font-serif">:</td>
                          <td className="align-top font-serif font-semibold">
                            {(sp2d.spm.spp.lpjBelanja?.jenis === "LS" ||
                              sp2d.spm.spp.lpjBelanja?.jenis === "TU") &&
                              sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.rekanan?.npwp)
                                .join(", ")}
                            {(sp2d.spm.spp.lpjBelanja?.jenis === "LS" ||
                              sp2d.spm.spp.lpjBelanja?.jenis === "TU") &&
                              sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.pegawai?.npwp)
                                .join(", ")}
                            {(sp2d.spm.spp.lpjBelanja?.jenis === "LS" ||
                              sp2d.spm.spp.lpjBelanja?.jenis === "TU") &&
                              !sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.pegawai?.npwp)
                                .join(", ") &&
                              !sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.rekanan?.npwp)
                                .join(", ") &&
                              "953350162722000"}
                            {sp2d.spm.spp.lpjBelanja?.jenis === "GU" &&
                              "953350162722000"}
                          </td>
                        </tr>
                        <tr>
                          <td className="align-top font-serif">
                            No. Rekening Bank
                          </td>
                          <td className="align-top font-serif">:</td>
                          <td className="align-top font-serif font-semibold">
                            {(sp2d.spm.spp.lpjBelanja?.jenis === "LS" ||
                              sp2d.spm.spp.lpjBelanja?.jenis === "TU") &&
                              sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.rekanan?.noRekening)
                                .join(", ")}
                            {(sp2d.spm.spp.lpjBelanja?.jenis === "LS" ||
                              sp2d.spm.spp.lpjBelanja?.jenis === "TU") &&
                              sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.pegawai?.noRekening)
                                .join(", ")}
                            {(sp2d.spm.spp.lpjBelanja?.jenis === "LS" ||
                              sp2d.spm.spp.lpjBelanja?.jenis === "TU") &&
                              !sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.pegawai?.noRekening)
                                .join(", ") &&
                              !sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.rekanan?.noRekening)
                                .join(", ") &&
                              "0011445004"}
                            {sp2d.spm.spp.lpjBelanja?.jenis === "GU" &&
                              "0011445004"}
                          </td>
                        </tr>
                        <tr>
                          <td className="align-top font-serif">
                            Nama di Rekening Bank
                          </td>
                          <td className="align-top font-serif">:</td>
                          <td className="align-top font-serif font-semibold">
                            {(sp2d.spm.spp.lpjBelanja?.jenis === "LS" ||
                              sp2d.spm.spp.lpjBelanja?.jenis === "TU") &&
                              sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.rekanan?.namaRekening)
                                .join(", ")}
                            {(sp2d.spm.spp.lpjBelanja?.jenis === "LS" ||
                              sp2d.spm.spp.lpjBelanja?.jenis === "TU") &&
                              sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.pegawai?.namaRekening)
                                .join(", ")}
                            {(sp2d.spm.spp.lpjBelanja?.jenis === "LS" ||
                              sp2d.spm.spp.lpjBelanja?.jenis === "TU") &&
                              !sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.pegawai?.namaRekening)
                                .join(", ") &&
                              !sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.rekanan?.namaRekening)
                                .join(", ") &&
                              "BP BLUD RSJD AHM"}
                            {sp2d.spm.spp.lpjBelanja?.jenis === "GU" &&
                              "BP BLUD RSJD AHM"}
                          </td>
                        </tr>
                        <tr>
                          <td className="align-top font-serif">
                            Bank Penerima
                          </td>
                          <td className="align-top font-serif">:</td>
                          <td className="align-top font-serif font-semibold">
                            {(sp2d.spm.spp.lpjBelanja?.jenis === "LS" ||
                              sp2d.spm.spp.lpjBelanja?.jenis === "TU") &&
                              sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.rekanan?.bank?.nama)
                                .join(", ")}
                            {(sp2d.spm.spp.lpjBelanja?.jenis === "LS" ||
                              sp2d.spm.spp.lpjBelanja?.jenis === "TU") &&
                              sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.pegawai?.bank?.nama)
                                .join(", ")}
                            {(sp2d.spm.spp.lpjBelanja?.jenis === "LS" ||
                              sp2d.spm.spp.lpjBelanja?.jenis === "TU") &&
                              !sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.pegawai?.bank?.nama)
                                .join(", ") &&
                              !sp2d.spm.spp.lpjBelanja?.belanja
                                .map((item) => item.rekanan?.bank?.nama)
                                .join(", ") &&
                              "PT. BPD KALTIM KALTARA"}
                            {sp2d.spm.spp.lpjBelanja?.jenis === "GU" &&
                              "PT. BPD KALTIM KALTARA"}
                          </td>
                        </tr>
                        <tr>
                          <td className="align-top font-serif">
                            Keperluan Untuk
                          </td>
                          <td className="align-top font-serif">:</td>
                          <td className="align-top font-serif font-semibold">
                            {sp2d.spm.spp.lpjBelanja?.uraian}
                          </td>
                        </tr>
                        <tr>
                          <td className="align-top font-serif">
                            Pagu Anggaran
                          </td>
                          <td className="align-top font-serif">:</td>
                          <td className="align-top font-serif font-semibold">
                            Rp{" "}
                            {formatAngkaDecimal(
                              sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                                (acc, item) => acc + Number(item.jumlah),
                                0,
                              ),
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={5}
                    className="border-[0.5pt] border-black font-serif"
                  >
                    <table className="-m-[1pt] w-[calc(100%+1pt)]">
                      <tbody>
                        <tr className="border-b-[0.5pt] border-black">
                          <th className="w-[5%] border-r-[0.5pt] border-black px-3 font-serif uppercase">
                            No
                          </th>
                          <th className="w-[15%] border-r-[0.5pt] border-black px-3 font-serif uppercase">
                            Kode Rekening
                          </th>
                          <th className="border-r-[0.5pt] border-black px-3 font-serif uppercase">
                            Uraian
                          </th>
                          <th className="w-[20%] border-black px-3 font-serif uppercase">
                            Jumlah
                          </th>
                        </tr>

                        <tr className="border-b-[0.5pt] border-black font-semibold">
                          <td className="border-r-[0.5pt] border-black px-3 text-center align-top font-serif">
                            1
                          </td>
                          <td
                            colSpan={3}
                            className="border-black px-3 align-top font-serif"
                          >
                            1.02.01.1.10 Peningkatan Pelayanan BLUD
                          </td>
                        </tr>
                        <tr className="border-b-[0.5pt] border-black font-semibold">
                          <td className="border-r-[0.5pt] border-black px-3 text-center align-top font-serif">
                            2
                          </td>
                          <td colSpan={3} className="px-3 align-top font-serif">
                            1.02.01.1.10.0001 Pelayanan dan Penunjang Pelayanan
                            BLUD
                          </td>
                        </tr>

                        {uniqueRekening.map((kodeRekening, index) => {
                          const filtered =
                            sp2d.spm.spp.lpjBelanja?.belanja?.filter(
                              (item) => item.rab?.kodeRekening === kodeRekening,
                            );
                          const total = filtered.reduce(
                            (acc, item) => acc + Number(item.jumlah),
                            0,
                          );

                          return (
                            <tr
                              key={index}
                              className="border-b-[0.5pt] border-black"
                            >
                              <td className="border-r-[0.5pt] border-black px-3 text-center align-top font-serif">
                                {index + 3}
                              </td>
                              <td className="border-r-[0.5pt] border-black px-3 align-top font-serif">
                                {kodeRekening}
                              </td>
                              <td className="border-r-[0.5pt] border-black px-3 align-top font-serif">
                                {filtered[0].rab.rekening?.uraian}
                              </td>
                              <td className="px-3 text-right align-top font-serif">
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
                            className="border-r-[0.5pt] border-black px-3 text-right font-serif font-semibold"
                          >
                            Jumlah
                          </td>
                          <td className="px-3 text-right font-serif font-semibold">
                            {formatAngkaDecimal(
                              sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                                (acc, item) => acc + Number(item.jumlah),
                                0,
                              ),
                            )}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan={5}
                    className="border-[0.5pt] border-black px-3 py-1 font-serif font-semibold"
                  >
                    Potongan-Potongan:
                  </td>
                </tr>
                <tr>
                  <th className="w-[5%] border-[0.5pt] border-black px-3 py-1 font-serif font-semibold uppercase">
                    No
                  </th>
                  <th
                    colSpan={sp2d.spm.spp.lpjBelanja.jenis === "LS" ? 1 : 2}
                    className="border-[0.5pt] border-black px-3 py-1 font-serif font-semibold uppercase"
                  >
                    Uraian
                  </th>
                  <th className="w-[20%] border-[0.5pt] border-black px-3 py-1 font-serif font-semibold uppercase">
                    Jumlah
                  </th>
                  {sp2d.spm.spp.lpjBelanja.jenis === "LS" && (
                    <th className="border-[0.5pt] border-black px-3 py-1 font-serif font-semibold uppercase">
                      ID BILLING
                    </th>
                  )}

                  <th className="w-[20%] border-[0.5pt] border-black px-3 py-1 font-serif font-semibold uppercase">
                    Keterangan
                  </th>
                </tr>
                {sp2d.spm.spp.lpjBelanja.jenis === "LS" &&
                  sp2d.spm.spp.lpjBelanja.belanja.map((belanja, bi) => {
                    return belanja.potonganBelanja.map((potongan, index) => (
                      <tr key={index}>
                        <td className="border-[0.5pt] border-black px-2 text-center align-top font-serif">
                          {bi + 1 + index}
                        </td>
                        <td className="border-[0.5pt] border-black px-2 align-top font-serif">
                          {potongan.jenis}
                        </td>
                        <td className="border-[0.5pt] border-black px-2 text-right align-top font-serif">
                          {formatAngkaDecimal(potongan.jumlah)}
                        </td>
                        <td className="border-[0.5pt] border-black px-2 text-center align-top font-serif">
                          {potongan.billing}
                        </td>
                        <td className="border-[0.5pt] border-black px-2 align-top font-serif">
                          -
                        </td>
                      </tr>
                    ));
                  })}
                {sp2d.spm.spp.lpjBelanja.jenis === "GU" &&
                  uniquePotongan.map((potongan, index) => {
                    const filtered = sp2d.spm.spp.lpjBelanja?.belanja?.map(
                      (item) =>
                        item.potonganBelanja.filter(
                          (potonganItem) => potonganItem.jenis === potongan,
                        ),
                    );
                    const total = filtered.reduce(
                      (acc, item) =>
                        acc +
                        Number(
                          item.reduce(
                            (acc, item) => acc + Number(item.jumlah),
                            0,
                          ),
                        ),
                      0,
                    );

                    return (
                      <tr key={index}>
                        <td className="border-[0.5pt] border-black px-2 text-center align-top font-serif">
                          {index + 1}
                        </td>
                        <td
                          colSpan={2}
                          className="border-[0.5pt] border-black px-2 align-top font-serif"
                        >
                          {potongan}
                        </td>
                        <td className="border-[0.5pt] border-black px-2 text-right align-top font-serif">
                          {formatAngkaDecimal(total)}
                        </td>
                        <td className="border-[0.5pt] border-black px-2 align-top font-serif">
                          -
                        </td>
                      </tr>
                    );
                  })}
                <tr className="bg-neutral-200">
                  <td
                    colSpan={sp2d.spm.spp.lpjBelanja.jenis === "LS" ? 2 : 3}
                    className="border-[0.5pt] border-black px-2 text-right font-serif font-semibold"
                  >
                    Jumlah
                  </td>
                  <td className="border-[0.5pt] border-black px-2 text-right font-serif font-semibold">
                    {formatAngkaDecimal(
                      sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                        (acc, item) =>
                          acc +
                          Number(
                            item.potonganBelanja.reduce(
                              (acc, item) => acc + Number(item.jumlah),
                              0,
                            ),
                          ),
                        0,
                      ),
                    )}
                  </td>
                  {sp2d.spm.spp.lpjBelanja.jenis === "LS" && (
                    <td className="border-[0.5pt] border-black px-2 font-serif font-semibold"></td>
                  )}

                  <td className="border-[0.5pt] border-black px-2 font-serif font-semibold"></td>
                </tr>
                <tr className="bg-orange-100">
                  <td
                    colSpan={5}
                    className="border-[0.5pt] border-black px-3 py-1 font-serif"
                  ></td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    className="border-[0.5pt] border-black px-3 py-1 align-top font-serif font-semibold"
                  >
                    SP2D yang Dibayarkan:
                  </td>
                  <td
                    colSpan={2}
                    className="border-[0.5pt] border-black px-3 py-1 text-right align-top font-serif font-semibold"
                  >
                    {formatAngkaDecimal(
                      sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                        (acc, item) => acc + Number(item.jumlah),
                        0,
                      ),
                    )}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    className="border-[0.5pt] border-black px-3 py-1 align-top font-serif font-semibold"
                  >
                    Jumlah Potongan:
                  </td>
                  <td
                    colSpan={2}
                    className="border-[0.5pt] border-black px-3 py-1 text-right align-top font-serif font-semibold"
                  >
                    {formatAngkaDecimal(
                      sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                        (acc, item) =>
                          acc +
                          Number(
                            item.potonganBelanja.reduce(
                              (acc, item) => acc + Number(item.jumlah),
                              0,
                            ),
                          ),
                        0,
                      ),
                    )}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    className="border-[0.5pt] border-black px-3 py-1 align-top font-serif font-semibold"
                  >
                    Jumlah Netto:
                  </td>
                  <td
                    colSpan={2}
                    className="border-[0.5pt] border-black px-3 py-1 text-right align-top font-serif font-semibold"
                  >
                    {formatAngkaDecimal(
                      sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                        (acc, item) => acc + Number(item.jumlah),
                        0,
                      ) -
                        sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                          (acc, item) =>
                            acc +
                            Number(
                              item.potonganBelanja.reduce(
                                (acc, item) => acc + Number(item.jumlah),
                                0,
                              ),
                            ),
                          0,
                        ),
                    )}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    className="border-[0.5pt] border-black px-3 py-1 align-top font-serif font-semibold"
                  >
                    Jumlah yang Dibayarkan:
                  </td>
                  <td
                    colSpan={2}
                    className="border-[0.5pt] border-black px-3 py-1 text-right align-top font-serif font-semibold"
                  >
                    {formatAngkaDecimal(
                      sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                        (acc, item) => acc + Number(item.jumlah),
                        0,
                      ),
                    )}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={5}
                    className="border-[0.5pt] border-black px-3 py-1 align-top font-serif font-semibold"
                  >
                    Uang Sejumlah:{" "}
                    {terbilang(
                      sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                        (acc, item) => acc + Number(item.jumlah),
                        0,
                      ),
                    )}{" "}
                    Rupiah
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex w-full flex-row">
              <div className="w-full" />
              <div className="w-3/5 text-center font-serif">
                <div className="font-serif">
                  Samarinda, {formatTanggal(sp2d.tglDokumen)}
                </div>
                <div className="font-serif">Kuasa Pengguna Anggaran</div>
                <div className="mt-12 font-serif underline">
                  dr. Indah Puspitasari, MARS
                </div>
                <div className="font-serif">Pembina Utama Muda</div>
                <div className="font-serif">NIP. 196705301998032003</div>
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
  "/_dashboard/belanja/sp2d/$sp2dId/cetak-sp2d/",
)({
  component: Page,
});
