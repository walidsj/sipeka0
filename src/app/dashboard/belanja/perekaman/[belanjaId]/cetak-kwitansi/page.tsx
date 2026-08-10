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
import Loading from "@/components/loading";
import { useReactToPrint } from "react-to-print";
import React from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { terbilang, formatTanggal } from "@/lib/utils";
import NotFound from "@/app/not-found";

export default function EditPage() {
  const params = useParams<{ belanjaId: string }>();

  const {
    data: belanja,
    isError,
    isLoading,
  } = api.belanja.getById.useQuery(Number(params.belanjaId));

  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  if (isLoading) return <Loading />;

  if (isError) return <NotFound />;

  if (!belanja) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cetak Kwitansi</CardTitle>
        <CardDescription>Dokumen kwitansi belanja siap cetak</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border p-10 shadow">
          <div
            style={{
              fontSize: "10pt",
            }}
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
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="w-1/3 align-top font-serif font-bold">
                    UNTUK DINAS
                    <br />
                    <i className="font-serif">Lembar Ke 1 (Satu)</i>
                  </td>
                  <td className="flex justify-end font-bold">
                    <table>
                      <tr>
                        <td className="min-w-36 py-0 font-serif">
                          Tahun Anggaran
                        </td>
                        <td className="min-w-4 py-0">:</td>
                        <td className="py-0 font-serif">
                          {format(new Date(belanja.tglDokumen!), "yyyy")}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-0 font-serif">Nomor BKU</td>
                        <td className="py-0">:</td>
                        <td className="py-0 font-serif">{belanja.noDokumen}</td>
                      </tr>
                      <tr>
                        <td className="py-0 font-serif">Kode Rekening</td>
                        <td className="py-0">:</td>
                        <td className="py-0 font-serif">
                          {belanja.rab?.kodeRekening}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <h4 className="mt-3 text-center font-serif text-xl font-bold italic underline">
              KWITANSI / BUKTI PEMBAYARAN
            </h4>
            <table className="mt-3 w-full">
              <tbody>
                <tr>
                  <td className="w-36 font-serif">Sudah terima dari</td>
                  <td className="w-4">:</td>
                  <td className="font-serif">
                    Kuasa Pengguna Anggaran BLUD RSJD Atma Husada Mahakam
                  </td>
                </tr>
                <tr>
                  <td className="font-serif">Jumlah</td>
                  <td>:</td>
                  <td className="font-serif text-lg font-bold">
                    {Number(belanja.jumlah).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="font-serif">Terbilang</td>
                  <td>:</td>
                  <td>
                    <div className="border border-black bg-gray-200 p-2 font-serif font-bold italic">
                      {terbilang(Number(belanja.jumlah))} Rupiah
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="align-top font-serif">Untuk</td>
                  <td className="align-top">:</td>
                  <td className="align-top font-serif">{belanja.uraian}</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-3 flex">
              <div className="w-3/5" />
              <div className="w-2/5">
                <div className="font-serif">Samarinda,</div>
                <div className="font-serif">Penerima,</div>
                {belanja.rekanan && (
                  <div className="mt-14 font-serif font-bold">
                    {belanja.rekanan?.nama}
                  </div>
                )}
                {belanja.pegawai && (
                  <>
                    <div className="mt-14 font-serif font-bold">
                      {belanja.pegawai.gelarDepan &&
                        `${belanja.pegawai.gelarDepan} `}
                      {belanja.pegawai.nama}
                      {belanja.pegawai.gelarBelakang &&
                        `, ${belanja.pegawai.gelarBelakang}`}
                    </div>
                    <>
                      {belanja.pegawai.nip && (
                        <div className="font-serif">
                          NIP. {belanja.pegawai.nip}
                        </div>
                      )}
                    </>
                  </>
                )}
              </div>
            </div>
            <hr className="mt-1 border-black" />
            <div className="mt-3 flex">
              <div className="w-3/5">
                <div className="font-serif">Disetujui dibayar:</div>
                <div className="font-serif">Kuasa Pengguna Anggaran</div>
                <div className="mt-14 font-serif font-bold">
                  dr. Indah Puspitasari, MARS
                </div>
                <div className="font-serif">Pembina Utama Muda</div>
                <div className="font-serif">NIP. 196705301998032003</div>
              </div>
              <div className="w-2/5">
                <div className="font-serif">
                  Setuju dan Lunas dibayar:{" "}
                  {formatTanggal(new Date(belanja.tglDokumen!))}
                </div>
                <div className="font-serif">
                  Bendahara Pengeluaran Pembantu BLUD
                </div>
                <div className="mt-14 font-serif font-bold">Riandy, S.Kep</div>
                <div className="font-serif">Penata Tk. I</div>
                <div className="font-serif">NIP. 197901281999031003</div>
              </div>
            </div>
            <hr className="mt-1 border-black" />
            <div className="mt-3 w-2/3">
              <div className="font-serif">
                Barang/pekerjaan tersebut telah diterima/diselesaikan dengan
                lengkap dan baik.
              </div>
              <div className="font-serif">Pejabat yang Bertanggungjawab,</div>
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
