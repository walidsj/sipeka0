import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams, useSearchParams } from "react-router-dom";
import { api } from "@/trpc/react";
import { Spinner } from "@/components/ui/spinner";
import { useReactToPrint } from "react-to-print";
import React from "react";
import { Button } from "@/components/ui/button";
import { terbilang, formatAngkaDecimal, ucFirst } from "@/lib/utils";
import NotFound from "@/app/not-found";
import { FaCheck } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  const params = useParams<{ belanjaId: string }>();

  const [searchParams, setSearchParams] = useSearchParams({
    includeAdminBank: "false",
    penyetorId: "null",
  });

  const {
    data: belanja,
    isError,
    isLoading,
  } = api.belanja.getById.useQuery(Number(params.belanjaId));

  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  if (isLoading) return <Spinner />;

  if (isError) return <NotFound />;

  if (!belanja) return <NotFound />;

  const biayaAdmin =
    belanja.rekanan?.bank?.kode == "124" || belanja.pegawai?.bank?.kode == "124"
      ? 0
      : 2900;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cetak Setoran Bank</CardTitle>
        <CardDescription>
          Dokumen ini digunakan untuk mencetak setoran bank
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <Select
            value={searchParams.get("includeAdminBank") || "false"}
            onValueChange={(val) => {
              searchParams.set("includeAdminBank", val);
              setSearchParams(searchParams);
            }}
          >
            <SelectTrigger className="mb-5 w-fit font-semibold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="false">TF dikurangi Admin Bank</SelectItem>
              <SelectItem value="true">
                TF tidak dikurangi Admin Bank
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border p-10 shadow">
          {biayaAdmin == 0 && (
            <div ref={componentRef}>
              <style type="text/css" media="print">
                {`
                                @page {
                                    size: A4 portrait;
                                    margin-top: 2cm;
                                    margin-left: 5.5cm;
                                    margin-right: 5mm;
                                    margin-bottom: 1.5cm;
                                    color: red;

                                }
                            `}
              </style>
              <table className="w-[100%] font-bold">
                <tbody>
                  <tr>
                    <td className="w-auto border border-transparent align-top">
                      <table className="text-black-500 mt-[3mm] w-[80%] border-separate border-spacing-[0.75mm]">
                        <tbody>
                          <tr>
                            <td className="h-[5mm] border border-transparent py-0 align-top text-[10pt] leading-[11pt]">
                              <FaCheck />
                            </td>
                          </tr>
                          <tr>
                            <td className="h-[5mm] border border-transparent py-0 pl-[4.35cm] align-top text-[10pt] leading-[11pt]">
                              <FaCheck />
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[5mm] border border-transparent py-0 align-top text-[8pt] leading-[9pt]">
                              {belanja.rekanan?.noRekening ||
                                belanja.pegawai?.noRekening}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[5mm] border border-transparent py-0 align-top text-[8pt] leading-[9pt]">
                              {belanja.rekanan?.namaRekening ||
                                belanja.pegawai?.namaRekening}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[5mm] border border-transparent py-0 align-top text-[8pt] leading-[9pt]">
                              {formatAngkaDecimal(
                                Number(
                                  Number(belanja.jumlah) -
                                    belanja.potonganBelanja.reduce(
                                      (acc, item) => acc + Number(item.jumlah),
                                      0,
                                    ),
                                ),
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[8.5mm] border border-transparent py-0 align-top text-[7pt] leading-[8pt]">
                              {ucFirst(
                                terbilang(
                                  Number(
                                    Number(belanja.jumlah) -
                                      belanja.potonganBelanja.reduce(
                                        (acc, item) =>
                                          acc + Number(item.jumlah),
                                        0,
                                      ),
                                  ),
                                ),
                              )}{" "}
                              Rupiah
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[5mm] border border-transparent py-0 align-top text-[7pt] leading-[8pt]">
                              {belanja.uraian}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="font-serif mt-[5mm] ml-[1cm] text-[8pt] leading-[9pt]">
                        BLUD RSJD AHM
                      </p>
                    </td>
                    <td className="w-[3.75cm] border border-transparent align-top">
                      <table className="text-black-500 w-full border-separate border-spacing-[0.75mm]">
                        <tbody>
                          <tr>
                            <td className="font-serif h-[4mm] border border-transparent py-0 align-top text-[8pt] leading-[9pt]"></td>
                          </tr>
                          <tr>
                            <td className="h-[4mm] border border-transparent py-0 align-top text-[10pt] leading-[11pt]">
                              <FaCheck />
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[4mm] border border-transparent py-0 align-top text-[8pt] leading-[9pt]">
                              RSJD AHM
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[4mm] border border-transparent py-0 align-top text-[8pt] leading-[9pt]">
                              Jl. Kakap No. 23
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[4mm] border border-transparent py-0 align-top text-[8pt] leading-[9pt]">
                              0541-743364
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {biayaAdmin > 0 && (
            <div ref={componentRef}>
              <style type="text/css" media="print">
                {`
                            @page {
                                size: A4 portrait;
                                margin-top: 2.5cm;
                                margin-left: 5cm;
                                margin-right: 1cm;
                                margin-bottom: 3.5cm;

                            }
                        `}
              </style>
              <table className="w-[100%] font-bold">
                <tbody>
                  <tr>
                    <td
                      colSpan={2}
                      className="h-[5mm] border border-transparent pl-[5.8cm] align-top text-[10pt] leading-[11pt]"
                    >
                      <FaCheck />
                    </td>
                  </tr>
                  <tr>
                    <td className="w-auto border border-transparent align-top">
                      <table className="text-black-500 mt-[4mm] w-[100%] border-separate border-spacing-[0.3mm]">
                        <tbody>
                          <tr>
                            <td className="font-serif h-[4mm] border border-transparent py-0 align-top text-[8pt] leading-[9pt]">
                              {belanja.rekanan?.namaRekening ||
                                belanja.pegawai?.namaRekening}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[4mm] border border-transparent py-0 align-top text-[6pt] leading-[5pt]">
                              {belanja.rekanan?.alamat}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[4mm] border border-transparent py-0 align-top text-[8pt] leading-[9pt]"></td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[4mm] border border-transparent py-0 align-top text-[8pt] leading-[9pt]">
                              {belanja.rekanan?.noTelp}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[4mm] border border-transparent py-0 align-top text-[8pt] leading-[9pt]">
                              {belanja.rekanan?.bank?.nama ||
                                belanja.pegawai?.bank?.nama}
                              (
                              {belanja.rekanan?.bank?.kode ||
                                belanja.pegawai?.bank?.kode}
                              )
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[4mm] border border-transparent py-0 align-top text-[8pt] leading-[9pt]"></td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[4mm] border border-transparent py-0 pl-[2mm] align-top text-[9pt] leading-[10pt]">
                              {belanja.rekanan?.noRekening ||
                                belanja.pegawai?.noRekening}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="text-black-500 mt-[5mm] w-[100%] border-separate border-spacing-[0.25mm]">
                        <tbody>
                          <tr>
                            <td className="font-serif h-[4mm] border border-transparent py-0 align-top text-[8pt] leading-[9pt]">
                              RSJD AHM
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[4mm] border border-transparent py-0 align-top text-[7pt] leading-[8pt]">
                              Jl. Kakap No. 23
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[4mm] border border-transparent py-0 align-top text-[8pt] leading-[9pt]"></td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[4mm] border border-transparent py-0 align-top text-[8pt] leading-[9pt]">
                              0541-743364
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[4mm] border border-transparent py-0 align-top text-[8pt] leading-[9pt]"></td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="text-black-500 mt-[6mm] w-[100%] border-separate border-spacing-[0.25mm]">
                        <tbody>
                          <tr>
                            <td className="font-serif h-[4mm] border border-transparent py-0 pl-[1.25cm] align-top text-[8pt] leading-[9pt]">
                              BLUD RSJD AHM
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td className="w-[7.5cm] border border-transparent align-top">
                      <table className="text-black-500 w-[100%] border-separate border-spacing-[0.25mm]">
                        <tbody>
                          <tr>
                            <td className="font-serif h-[4mm] border border-transparent py-0 pl-[1cm] align-top text-[8pt] leading-[9pt]">
                              <FaCheck />
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif border border-transparent py-2 align-top text-[8pt] leading-[9pt]">
                              <FaCheck />
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[4mm] border border-transparent py-0 align-top text-[8pt] leading-[9pt]"></td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[4.5mm] border border-transparent py-0 align-top text-[8pt] leading-[9pt]"></td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[4.5mm] border border-transparent py-0 text-right align-bottom text-[9pt] leading-[10pt]">
                              {formatAngkaDecimal(
                                Number(belanja.jumlah) -
                                  belanja.potonganBelanja.reduce(
                                    (acc, item) => acc + Number(item.jumlah),
                                    0,
                                  ) -
                                  (searchParams.get("includeAdminBank") ===
                                  "true"
                                    ? 0
                                    : biayaAdmin),
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[4.5mm] border border-transparent py-0 text-right align-bottom text-[9pt] leading-[10pt]">
                              {formatAngkaDecimal(biayaAdmin)}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[4.5mm] border border-transparent py-0 text-right align-bottom text-[9pt] leading-[10pt]">
                              {formatAngkaDecimal(
                                (searchParams.get("includeAdminBank") === "true"
                                  ? biayaAdmin
                                  : 0) +
                                  Number(belanja.jumlah) -
                                  belanja.potonganBelanja.reduce(
                                    (acc, item) => acc + Number(item.jumlah),
                                    0,
                                  ),
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[2cm] border border-transparent py-0 pt-[8mm] align-top text-[7pt] leading-[8pt]">
                              {ucFirst(
                                terbilang(
                                  (searchParams.get("includeAdminBank") ===
                                  "true"
                                    ? biayaAdmin
                                    : 0) +
                                    Number(belanja.jumlah) -
                                    belanja.potonganBelanja.reduce(
                                      (acc, item) => acc + Number(item.jumlah),
                                      0,
                                    ),
                                ),
                              )}{" "}
                              Rupiah
                            </td>
                          </tr>
                          <tr>
                            <td className="font-serif h-[1cm] border border-transparent py-0 pt-[5mm] align-top text-[7pt] leading-[8pt]">
                              {belanja.uraian}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => handlePrint()}>Cetak</Button>
      </CardFooter>
    </Card>
  );
}
