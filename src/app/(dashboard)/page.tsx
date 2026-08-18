import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth";
import { cn, formatAngka, formatTanggal } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis } from "recharts";
import React from "react";
import { Helmet } from "react-helmet";

export default function Dashboard() {
  const auth = useAuth();

  const profilBlud = api.profilBlud.get.useQuery();

  const { data: chartData } = api.belanja.getRealisasiHome.useQuery();

  const realisasiPendapatan = api.pendapatan.getRealisasiAll.useQuery();

  const targetPendapatan = api.pendapatan.getTarget.useQuery();

  const latestPendapatan = api.pendapatan.getLatest.useQuery();

  const latestDba = api.dba.getLatest.useQuery();

  const realisasiBelanja = api.belanja.getRealisasiAll.useQuery();

  const targetBelanja = api.belanja.getTarget.useQuery();

  const latestBelanja = api.belanja.getLatest.useQuery();

  const countDba = api.dba.count.useQuery();

  return (
    <div className="flex w-full flex-col gap-5">
      <Helmet>
        <title>Atmaku - Sistem Informasi Keuangan</title>
      </Helmet>
      <div className="flex flex-col items-center justify-between gap-5 rounded-lg px-5 py-8 md:flex-row md:gap-16">
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>
                <img src="/images/logo-sipeka-full-long.svg" className="h-10" />
              </CardTitle>
              <CardDescription>
                Manajemen Keuangan BLUD RSJD Atma Husada Mahakam
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="w-full flex-shrink-0 md:max-w-md lg:max-w-lg">
          {chartData && (
            <ChartContainer
              className="w-full md:min-h-[70svh] lg:min-h-[60svh]"
              config={{
                "Belanja Pegawai": {
                  label: "Belanja Pegawai",
                },
                "Belanja Barang Jasa": {
                  label: "Belanja Barang dan Jasa",
                },
                "Belanja Modal": {
                  label: "Belanja Modal",
                },
              }}
            >
              <BarChart accessibilityLayer data={chartData}>
                <Tooltip
                  formatter={(value) =>
                    `Rp ${Intl.NumberFormat("id").format(Number(value))}`
                  }
                />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="0" />
                <Bar dataKey="Belanja Pegawai" fill="#3c83f6" stackId="a" />
                <Bar dataKey="Belanja Barang Jasa" fill="#10b981" stackId="a" />
                <Bar dataKey="Belanja Modal" fill="#eab308" stackId="a" />

                <Legend />
              </BarChart>
            </ChartContainer>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Profil User Pegawai</CardDescription>
            {(auth.user?.pegawai && (
              <React.Fragment>
                <CardTitle>
                  {auth.user.pegawai.gelarDepan &&
                    `${auth.user.pegawai.gelarDepan} `}
                  {auth.user.pegawai.nama}
                  {auth.user.pegawai.gelarBelakang &&
                    `, ${auth.user.pegawai.gelarBelakang}`}
                </CardTitle>
                <p className="text-sm text-slate-500">
                  {auth.user.pegawai.jabatan}
                </p>
                <Badge
                  className={cn(
                    auth.user.pegawai.statusPegawai === "PPPK" &&
                      "bg-secondary",
                    auth.user.pegawai.statusPegawai === "NON ASN" &&
                      "bg-yellow-500",
                    auth.user.pegawai.statusPegawai === "MOU" && "bg-red-400",
                  )}
                >
                  {auth.user.pegawai.statusPegawai}
                </Badge>
              </React.Fragment>
            )) || <CardTitle>Profil belum terkoneksi</CardTitle>}
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Penetapan DBA</CardDescription>
            <CardTitle>
              {countDba.data &&
                `${countDba.data.count.toLocaleString("id-ID")} Kali`}
            </CardTitle>
            <CardDescription>
              {countDba.data &&
                `${countDba.data.count.toLocaleString("id-ID")} DBA telah disahkan`}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>DBA Sedang Aktif</CardDescription>
            <CardTitle>{latestDba.data && latestDba.data.uraian}</CardTitle>
            <CardDescription>
              Tanggal{" "}
              {latestDba.data && formatTanggal(latestDba.data.tglDokumen)}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Pagu Belanja</CardDescription>
            <CardTitle>
              {targetBelanja.data && formatAngka(targetBelanja.data)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Target Pendapatan</CardDescription>
            <CardTitle>
              {targetPendapatan.data && formatAngka(targetPendapatan.data)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Realisasi Belanja</CardDescription>
            <CardTitle>
              {realisasiBelanja.data &&
                Number(realisasiBelanja.data).toLocaleString("id-ID")}
            </CardTitle>
            <CardDescription>
              {targetBelanja.data &&
                realisasiBelanja.data &&
                formatAngka(
                  (Number(realisasiBelanja.data) /
                    Number(targetBelanja.data)) *
                    100,
                )}
              %
            </CardDescription>
            <Progress
              value={
                (Number(realisasiBelanja.data) /
                  Number(targetBelanja.data)) *
                100
              }
            />
            <CardDescription>
              Sisa Pagu:{" "}
              {targetBelanja.data &&
                realisasiBelanja.data &&
                formatAngka(
                  Number(targetBelanja.data) -
                    Number(realisasiBelanja.data),
                )}
            </CardDescription>
            <CardDescription>
              {latestBelanja.data && (
                <React.Fragment>
                  Per {formatTanggal(latestBelanja.data?.tglDokumen)}
                </React.Fragment>
              )}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Realisasi Pendapatan</CardDescription>
            <CardTitle>
              {realisasiPendapatan.data && formatAngka(realisasiPendapatan.data)}
            </CardTitle>
            <CardDescription>
              {targetPendapatan.data &&
                realisasiPendapatan.data &&
                formatAngka(
                  (Number(realisasiPendapatan.data) /
                    Number(targetPendapatan.data)) *
                    100,
                )}
              %
            </CardDescription>
            <Progress
              value={
                (Number(realisasiPendapatan.data) /
                  Number(targetPendapatan.data)) *
                100
              }
            />
            <CardDescription>
              Sisa Target:{" "}
              {targetPendapatan.data &&
                realisasiPendapatan.data &&
                formatAngka(
                  Number(targetPendapatan.data) -
                    Number(realisasiPendapatan.data),
                )}
            </CardDescription>
            <CardDescription>
              {latestPendapatan.data && (
                <React.Fragment>
                  Per {formatTanggal(latestPendapatan.data?.tglDokumen)}
                </React.Fragment>
              )}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Informasi Profil BLUD</CardDescription>
            {profilBlud.isSuccess && profilBlud.data && (
              <React.Fragment>
                <CardTitle>{profilBlud.data?.nama}</CardTitle>
                <CardDescription>{profilBlud.data?.alamat}</CardDescription>
              </React.Fragment>
            )}
            {profilBlud.isSuccess && !profilBlud.data && (
              <CardTitle>Profil BLUD belum diatur</CardTitle>
            )}
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
