import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn, formatAngka, formatTanggal } from "@/lib/utils";
import { api } from "@/trpc/react";
import { keepPreviousData } from "@tanstack/react-query";
import React from "react";
import { getRouteApi } from "@tanstack/react-router";
import { useReactToPrint } from "react-to-print";
import { useAuth } from "@/lib/auth";

const routeApi = getRouteApi("/_dashboard/akuntansi/lra/cetak/");

export default function LraCetakTable() {
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  const { user } = useAuth();
  const tahun = user?.tahun ?? "2026";
  const startDate = `${tahun}-01-01`;
  const endDate = search["endDate"] || `${tahun}-12-31`;

  const { data: belanja } = api.belanja.getBelanjaLra.useQuery(
    { startDate, endDate },
    { placeholderData: keepPreviousData, suspense: true },
  );

  if (!belanja) return <div>Data tidak dapat dimuat.</div>;

  const isFullPeriod = startDate.slice(5) === "01-01";
  const realisasi = (item: (typeof belanja)[number]) =>
    Number(item.jumlahSebelumnya ?? 0) + Number(item.jumlah ?? 0);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center gap-5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sampai:</span>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => {
              navigate({
                search: (prev) => ({ ...prev, endDate: e.target.value }),
              });
            }}
          />
        </div>
      </div>
      <div className="rounded-md border p-10 shadow">
        <div
          style={{ fontSize: "8pt" }}
          className="leading-4"
          ref={componentRef}
        >
          <style type="text/css" media="print">
            {`
              @page {
                size: A4 landscape;
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
                    style={{ fontSize: "10pt" }}
                    className="font-serif font-bold uppercase"
                  >
                    Pemerintah Provinsi Kalimantan Timur
                  </div>
                  <div
                    style={{ fontSize: "12pt" }}
                    className="font-serif font-bold uppercase"
                  >
                    Dinas Kesehatan
                  </div>
                  <div
                    style={{ fontSize: "12pt" }}
                    className="font-serif font-bold uppercase"
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
            style={{ fontSize: "11pt" }}
            className="text-center font-serif font-bold uppercase underline"
          >
            LAPORAN REALISASI ANGARAN
          </h5>
          <h6 className="text-center font-serif uppercase">
            Tahun Anggaran {tahun}
          </h6>
          <h6 className="mb-5 text-center font-serif">
            Periode {formatTanggal(startDate)} s.d. {formatTanggal(endDate)}
          </h6>
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-[0.5pt] border-black px-2 py-1 font-serif uppercase">
                  Kode Rekening
                </th>
                <th className="border-[0.5pt] border-black px-2 py-1 font-serif uppercase">
                  Uraian
                </th>
                <th className="border-[0.5pt] border-black px-2 py-1 text-right font-serif uppercase">
                  Anggaran (Rp)
                </th>
                {isFullPeriod ? (
                  <th className="border-[0.5pt] border-black px-2 py-1 text-right font-serif uppercase">
                    Realisasi (Rp)
                  </th>
                ) : (
                  <>
                    <th className="border-[0.5pt] border-black px-2 py-1 text-right font-serif uppercase">
                      Realisasi Periode Sebelumnya (Rp)
                    </th>
                    <th className="border-[0.5pt] border-black px-2 py-1 text-right font-serif uppercase">
                      Realisasi Periode Ini (Rp)
                    </th>
                    <th className="border-[0.5pt] border-black px-2 py-1 text-right font-serif uppercase">
                      Jumlah Realisasi (Rp)
                    </th>
                  </>
                )}
                <th className="border-[0.5pt] border-black px-2 py-1 text-right font-serif uppercase">
                  Sisa Anggaran (Rp)
                </th>
              </tr>
            </thead>
            <tbody>
              {belanja.map((item, index) => (
                <tr
                  key={index}
                  className={cn(
                    realisasi(item) > item.anggaran && "text-red-500",
                  )}
                >
                  <td className="border-[0.5pt] border-black px-2 py-1 font-serif">
                    {item.kodeRekening}
                  </td>
                  <td className="border-[0.5pt] border-black px-2 py-1 font-serif">
                    {item.uraian}
                  </td>
                  <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif">
                    {formatAngka(item.anggaran)}
                  </td>
                  {isFullPeriod ? (
                    <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif">
                      {formatAngka(item.jumlah)}
                    </td>
                  ) : (
                    <>
                      <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif">
                        {formatAngka(item.jumlahSebelumnya)}
                      </td>
                      <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif">
                        {formatAngka(item.jumlah)}
                      </td>
                      <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif">
                        {formatAngka(realisasi(item))}
                      </td>
                    </>
                  )}
                  <td className="border-[0.5pt] border-black px-2 py-1 text-right font-serif">
                    {formatAngka(item.anggaran - realisasi(item))}
                  </td>
                </tr>
              ))}
              {belanja.length === 0 && (
                <tr>
                  <td colSpan={100} className="border-[0.5pt] border-black px-2 py-2 text-center font-serif">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <th
                  colSpan={2}
                  className="border-[0.5pt] border-black px-2 py-2 font-serif text-left uppercase"
                >
                  Total
                </th>
                <th className="border-[0.5pt] border-black px-2 py-2 text-right font-serif uppercase">
                  {formatAngka(
                    belanja.reduce((acc, item) => acc + item.anggaran, 0),
                  )}
                </th>
                {isFullPeriod ? (
                  <th className="border-[0.5pt] border-black px-2 py-2 text-right font-serif uppercase">
                    {formatAngka(
                      belanja.reduce((acc, item) => acc + item.jumlah, 0),
                    )}
                  </th>
                ) : (
                  <>
                    <th className="border-[0.5pt] border-black px-2 py-2 text-right font-serif uppercase">
                      {formatAngka(
                        belanja.reduce(
                          (acc, item) =>
                            acc + Number(item.jumlahSebelumnya ?? 0),
                          0,
                        ),
                      )}
                    </th>
                    <th className="border-[0.5pt] border-black px-2 py-2 text-right font-serif uppercase">
                      {formatAngka(
                        belanja.reduce((acc, item) => acc + item.jumlah, 0),
                      )}
                    </th>
                    <th className="border-[0.5pt] border-black px-2 py-2 text-right font-serif uppercase">
                      {formatAngka(
                        belanja.reduce(
                          (acc, item) => acc + realisasi(item),
                          0,
                        ),
                      )}
                    </th>
                  </>
                )}
                <th className="border-[0.5pt] border-black px-2 py-2 text-right font-serif uppercase">
                  {formatAngka(
                    belanja.reduce(
                      (acc, item) => acc + item.anggaran - realisasi(item),
                      0,
                    ),
                  )}
                </th>
              </tr>
            </tfoot>
          </table>
          <div className="mt-10 flex">
            <div className="w-2/3"></div>
            <div className="w-1/3 text-center">
              <div className="font-serif">
                Samarinda, {formatTanggal(endDate)}
              </div>
              <div className="font-serif">Kuasa Pengguna Anggaran BLUD</div>
              <div className="mt-14 font-serif font-bold">
                dr. Indah Puspitasari, MARS
              </div>
              <div className="font-serif">Pembina Utama Muda</div>
              <div className="font-serif">NIP. 196705301998032003</div>
            </div>
          </div>
        </div>
      </div>
      <CardFooter>
        <Button onClick={() => handlePrint()}>Cetak</Button>
      </CardFooter>
    </div>
  );
}
