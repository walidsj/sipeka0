import { createFileRoute } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth";
import { cn, formatAngka, formatTanggal } from "@/lib/utils";
import { api } from "@/trpc/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React from "react";
import { Helmet } from "react-helmet";

function Dashboard() {
  const auth = useAuth();

  const profilBlud = api.profilBlud.get.useQuery();

  const { data: chartData } = api.belanja.getRealisasiHome.useQuery();

  const { data: kurvaS } = api.belanja.getRealisasiKurvaS.useQuery();

  const { data: realisasiPerUnitKerja } =
    api.belanja.getRealisasiPerUnitKerja.useQuery();

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
                  (Number(realisasiBelanja.data) / Number(targetBelanja.data)) *
                    100,
                )}
              %
            </CardDescription>
            <Progress
              value={
                (Number(realisasiBelanja.data) / Number(targetBelanja.data)) *
                100
              }
            />
            <CardDescription>
              Sisa Pagu:{" "}
              {targetBelanja.data &&
                realisasiBelanja.data &&
                formatAngka(
                  Number(targetBelanja.data) - Number(realisasiBelanja.data),
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
              {realisasiPendapatan.data &&
                formatAngka(realisasiPendapatan.data)}
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
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Realisasi Belanja</CardTitle>
            <CardDescription>
              Perbandingan realisasi belanja berdasarkan jenis belanja
            </CardDescription>
          </CardHeader>
          <CardContent>
            {chartData && (
              <ChartContainer
                className="h-80"
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
                  <XAxis dataKey="name" />
                  <Bar dataKey="Belanja Pegawai" fill="#3c83f6" stackId="a" />
                  <Bar
                    dataKey="Belanja Barang Jasa"
                    fill="#10b981"
                    stackId="a"
                  />
                  <Bar dataKey="Belanja Modal" fill="#eab308" stackId="a" />
                  <Legend />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Kurva S Realisasi Belanja</CardTitle>
            <CardDescription>
              Akumulasi realisasi belanja setiap bulan
            </CardDescription>
          </CardHeader>
          <CardContent>
            {kurvaS && (
              <ChartContainer
                className="h-80"
                config={{
                  realisasi: {
                    label: "Realisasi",
                    color: "#3c83f6",
                  },
                }}
              >
                <LineChart accessibilityLayer data={kurvaS}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    tickFormatter={(value) =>
                      Intl.NumberFormat("id", {
                        notation: "compact",
                        maximumFractionDigits: 1,
                      }).format(Number(value))
                    }
                  />
                  <Tooltip
                    formatter={(value) =>
                      `Rp ${Intl.NumberFormat("id").format(Number(value))}`
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="realisasi"
                    stroke="var(--color-realisasi)"
                    strokeWidth={2}
                    dot
                  />
                </LineChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Belanja per Unit Kerja</CardTitle>
            <CardDescription>
              Proporsi realisasi belanja berdasarkan unit kerja
            </CardDescription>
          </CardHeader>
          <CardContent>
            {realisasiPerUnitKerja && (
              <ChartContainer
                className="h-80"
                config={{
                  value: {
                    label: "Total",
                  },
                }}
              >
                <PieChart accessibilityLayer>
                  <Pie
                    data={realisasiPerUnitKerja}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                  >
                    {realisasiPerUnitKerja.map((_, index) => (
                      <Cell
                        key={index}
                        fill={`hsl(${(index * 360) / realisasiPerUnitKerja.length} 70% 50%)`}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) =>
                      `Rp ${Intl.NumberFormat("id").format(Number(value))}`
                    }
                  />
                  <Legend />
                </PieChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_dashboard/")({
  component: Dashboard,
});
