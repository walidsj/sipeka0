// routes.tsx - AUTO-GENERATED FILE
import {
  type DataRouteObject,
  useParams as _useParams,
  useNavigate as _useNavigate,
  Link as _Link,
  NavLink as _NavLink,
  Navigate as _Navigate,
  generatePath,
  type LinkProps as _LinkProps,
  type NavigateOptions as _NavigateOptions,
} from "react-router";
import React from "react";

export type Paths = "/"|
"/panduan"|
"/panduan/tech-stack"|
"/panduan/pengenalan"|
"/panduan/pendaftaran"|
"/panduan/login"|
"/panduan/faq"|
"/sipeka"|
"/sipeka/pendapatan"|
"/sipeka/pendapatan/perekaman"|
"/sipeka/pendapatan/perekaman/:pendapatanId/edit"|
"/sipeka/pendapatan/perekaman/tambah"|
"/sipeka/lainnya"|
"/sipeka/lainnya/user"|
"/sipeka/lainnya/user/:id/edit"|
"/sipeka/lainnya/user/tambah"|
"/sipeka/lainnya/referensi"|
"/sipeka/lainnya/referensi/kode-rekening"|
"/sipeka/lainnya/referensi/kode-rekening/:level"|
"/sipeka/lainnya/pengaturan"|
"/sipeka/lainnya/pengaturan/rekening-bank"|
"/sipeka/lainnya/pengaturan/rekening-bank/:id/edit"|
"/sipeka/lainnya/pengaturan/rekening-bank/tambah"|
"/sipeka/lainnya/pengaturan/profil-blud"|
"/sipeka/lainnya/pengaturan/pengelola-blud"|
"/sipeka/lainnya/pengaturan/pengelola-blud/:id/edit"|
"/sipeka/lainnya/pengaturan/pengelola-blud/tambah"|
"/sipeka/lainnya/database"|
"/sipeka/lainnya/database/unit-kerja"|
"/sipeka/lainnya/database/unit-kerja/:id/edit"|
"/sipeka/lainnya/database/unit-kerja/tambah"|
"/sipeka/lainnya/database/rekanan"|
"/sipeka/lainnya/database/rekanan/:id/edit"|
"/sipeka/lainnya/database/rekanan/tambah"|
"/sipeka/lainnya/database/pegawai"|
"/sipeka/lainnya/database/pegawai/:id/edit"|
"/sipeka/lainnya/database/pegawai/tambah"|
"/sipeka/lainnya/database/bank"|
"/sipeka/lainnya/database/bank/:id/edit"|
"/sipeka/lainnya/database/bank/tambah"|
"/sipeka/integrasi"|
"/sipeka/integrasi/sipd"|
"/sipeka/integrasi/sipd/tna"|
"/sipeka/integrasi/sipd/profil"|
"/sipeka/integrasi/sipd/login"|
"/sipeka/integrasi/sipd/cetak-lra"|
"/sipeka/belanja"|
"/sipeka/belanja/spp"|
"/sipeka/belanja/spp/:sppId"|
"/sipeka/belanja/spp/:sppId/edit"|
"/sipeka/belanja/spp/:sppId/cetak-surat-pengantar"|
"/sipeka/belanja/spp/:sppId/cetak-spp-rincian"|
"/sipeka/belanja/spp/:sppId/cetak-spp"|
"/sipeka/belanja/spp/tambah"|
"/sipeka/belanja/spm"|
"/sipeka/belanja/spm/:spmId"|
"/sipeka/belanja/spm/:spmId/edit"|
"/sipeka/belanja/spm/:spmId/cetak-sptjm"|
"/sipeka/belanja/spm/:spmId/cetak-spm"|
"/sipeka/belanja/spm/:spmId/cetak-pernyataan-verifikasi"|
"/sipeka/belanja/spm/tambah"|
"/sipeka/belanja/sp2d"|
"/sipeka/belanja/sp2d/:sp2dId"|
"/sipeka/belanja/sp2d/:sp2dId/edit"|
"/sipeka/belanja/sp2d/:sp2dId/cetak-sp2d"|
"/sipeka/belanja/sp2d/:sp2dId/cetak-kendali-cek"|
"/sipeka/belanja/sp2d/tambah"|
"/sipeka/belanja/perekaman"|
"/sipeka/belanja/perekaman/:belanjaId"|
"/sipeka/belanja/perekaman/:belanjaId/upload"|
"/sipeka/belanja/perekaman/:belanjaId/potongan/:potonganId/edit"|
"/sipeka/belanja/perekaman/:belanjaId/potongan/tambah"|
"/sipeka/belanja/perekaman/:belanjaId/edit"|
"/sipeka/belanja/perekaman/:belanjaId/cetak-setoran-bank"|
"/sipeka/belanja/perekaman/:belanjaId/cetak-kwitansi"|
"/sipeka/belanja/perekaman/:belanjaId/cetak-daftar-potong"|
"/sipeka/belanja/perekaman/:belanjaId/cetak-amplop"|
"/sipeka/belanja/perekaman/tambah"|
"/sipeka/belanja/lpj-belanja"|
"/sipeka/belanja/lpj-belanja/:lpjBelanjaId"|
"/sipeka/belanja/lpj-belanja/:lpjBelanjaId/tambah-belanja"|
"/sipeka/belanja/lpj-belanja/:lpjBelanjaId/edit"|
"/sipeka/belanja/lpj-belanja/:lpjBelanjaId/cetak"|
"/sipeka/belanja/lpj-belanja/tambah"|
"/sipeka/belanja/buku"|
"/sipeka/belanja/buku/kas-umum"|
"/sipeka/belanja/buku/buku-pajak"|
"/sipeka/belanja/buku/buku-pajak/cetak"|
"/sipeka/anggaran"|
"/sipeka/anggaran/rba"|
"/sipeka/anggaran/rba/penyusunan-rba"|
"/sipeka/anggaran/rba/penyusunan-rba/:rbaId/edit"|
"/sipeka/anggaran/rba/penyusunan-rba/:rbaId"|
"/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas"|
"/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/:aktivitasRbaId/rincian-rba"|
"/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/:aktivitasRbaId/rincian-rba/rap/:rincianRbaPendapatanId/edit"|
"/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/:aktivitasRbaId/rincian-rba/rap/tambah"|
"/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/:aktivitasRbaId/rincian-rba/rab/:rincianRbaBelanjaId/edit"|
"/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/:aktivitasRbaId/rincian-rba/rab/tambah"|
"/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/:aktivitasRbaId/edit"|
"/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/tambah"|
"/sipeka/anggaran/rba/penyusunan-rba/tambah"|
"/sipeka/anggaran/rba/daftar-rap"|
"/sipeka/anggaran/rba/daftar-rap/:rapId/edit"|
"/sipeka/anggaran/rba/daftar-rap/tambah"|
"/sipeka/anggaran/rba/daftar-rab"|
"/sipeka/anggaran/rba/daftar-rab/:rabId/edit"|
"/sipeka/anggaran/rba/daftar-rab/tambah"|
"/sipeka/anggaran/monitoring"|
"/sipeka/anggaran/monitoring/realisasi-belanja"|
"/sipeka/anggaran/monitoring/realisasi-belanja/:rincianRbaBelanjaId/edit"|
"/sipeka/anggaran/monitoring/realisasi-belanja/:rincianRbaBelanjaId/detail-belanja"|
"/sipeka/anggaran/monitoring/realisasi-belanja/tidak-terklasifikasi"|
"/sipeka/anggaran/dba"|
"/sipeka/anggaran/dba/penetapan"|
"/sipeka/anggaran/dba/penetapan/:dbaId/edit"|
"/sipeka/anggaran/dba/penetapan/tambah"|
"/sipeka/akuntansi"|
"/sipeka/akuntansi/sp3b"|
"/sipeka/akuntansi/sp3b/:sp3bId"|
"/sipeka/akuntansi/sp3b/:sp3bId/edit"|
"/sipeka/akuntansi/sp3b/:sp3bId/cetak-surat-pengantar"|
"/sipeka/akuntansi/sp3b/:sp3bId/cetak-sptjb-pendapatan"|
"/sipeka/akuntansi/sp3b/:sp3bId/cetak-sptjb-belanja"|
"/sipeka/akuntansi/sp3b/:sp3bId/cetak-sp3b"|
"/sipeka/akuntansi/sp3b/tambah"|
"/sipeka/akuntansi/rekening-koran"|
"/sipeka/akuntansi/rekening-koran/:rekeningBankId"|
"/sipeka/akuntansi/rekening-koran/:rekeningBankId/:rekeningKoranId/edit"|
"/sipeka/akuntansi/rekening-koran/import"|
"/sipeka/akuntansi/lra"|
"/sipeka/akuntansi/lra/:kodeRekening"|
"/sipeka/akuntansi/lra/cetak"|
"/profil"|
"/profil/ganti-password"|
"/myatma"|
"/myatma/tunjangan"|
"/myatma/jasa-pelayanan"|
"/myatma/gaji"|
"/register"|
"/login";

export type Params = {
  "/sipeka/pendapatan/perekaman/:pendapatanId/edit": {pendapatanId: string};
  "/sipeka/lainnya/user/:id/edit": {id: string};
  "/sipeka/lainnya/referensi/kode-rekening/:level": {level: string};
  "/sipeka/lainnya/pengaturan/rekening-bank/:id/edit": {id: string};
  "/sipeka/lainnya/pengaturan/pengelola-blud/:id/edit": {id: string};
  "/sipeka/lainnya/database/unit-kerja/:id/edit": {id: string};
  "/sipeka/lainnya/database/rekanan/:id/edit": {id: string};
  "/sipeka/lainnya/database/pegawai/:id/edit": {id: string};
  "/sipeka/lainnya/database/bank/:id/edit": {id: string};
  "/sipeka/belanja/spp/:sppId": {sppId: string};
  "/sipeka/belanja/spp/:sppId/edit": {sppId: string};
  "/sipeka/belanja/spp/:sppId/cetak-surat-pengantar": {sppId: string};
  "/sipeka/belanja/spp/:sppId/cetak-spp-rincian": {sppId: string};
  "/sipeka/belanja/spp/:sppId/cetak-spp": {sppId: string};
  "/sipeka/belanja/spm/:spmId": {spmId: string};
  "/sipeka/belanja/spm/:spmId/edit": {spmId: string};
  "/sipeka/belanja/spm/:spmId/cetak-sptjm": {spmId: string};
  "/sipeka/belanja/spm/:spmId/cetak-spm": {spmId: string};
  "/sipeka/belanja/spm/:spmId/cetak-pernyataan-verifikasi": {spmId: string};
  "/sipeka/belanja/sp2d/:sp2dId": {sp2dId: string};
  "/sipeka/belanja/sp2d/:sp2dId/edit": {sp2dId: string};
  "/sipeka/belanja/sp2d/:sp2dId/cetak-sp2d": {sp2dId: string};
  "/sipeka/belanja/sp2d/:sp2dId/cetak-kendali-cek": {sp2dId: string};
  "/sipeka/belanja/perekaman/:belanjaId": {belanjaId: string};
  "/sipeka/belanja/perekaman/:belanjaId/upload": {belanjaId: string};
  "/sipeka/belanja/perekaman/:belanjaId/potongan/:potonganId/edit": {belanjaId: string, potonganId: string};
  "/sipeka/belanja/perekaman/:belanjaId/potongan/tambah": {belanjaId: string};
  "/sipeka/belanja/perekaman/:belanjaId/edit": {belanjaId: string};
  "/sipeka/belanja/perekaman/:belanjaId/cetak-setoran-bank": {belanjaId: string};
  "/sipeka/belanja/perekaman/:belanjaId/cetak-kwitansi": {belanjaId: string};
  "/sipeka/belanja/perekaman/:belanjaId/cetak-daftar-potong": {belanjaId: string};
  "/sipeka/belanja/perekaman/:belanjaId/cetak-amplop": {belanjaId: string};
  "/sipeka/belanja/lpj-belanja/:lpjBelanjaId": {lpjBelanjaId: string};
  "/sipeka/belanja/lpj-belanja/:lpjBelanjaId/tambah-belanja": {lpjBelanjaId: string};
  "/sipeka/belanja/lpj-belanja/:lpjBelanjaId/edit": {lpjBelanjaId: string};
  "/sipeka/belanja/lpj-belanja/:lpjBelanjaId/cetak": {lpjBelanjaId: string};
  "/sipeka/anggaran/rba/penyusunan-rba/:rbaId/edit": {rbaId: string};
  "/sipeka/anggaran/rba/penyusunan-rba/:rbaId": {rbaId: string};
  "/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas": {rbaId: string};
  "/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/:aktivitasRbaId/rincian-rba": {rbaId: string, aktivitasRbaId: string};
  "/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/:aktivitasRbaId/rincian-rba/rap/:rincianRbaPendapatanId/edit": {rbaId: string, aktivitasRbaId: string, rincianRbaPendapatanId: string};
  "/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/:aktivitasRbaId/rincian-rba/rap/tambah": {rbaId: string, aktivitasRbaId: string};
  "/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/:aktivitasRbaId/rincian-rba/rab/:rincianRbaBelanjaId/edit": {rbaId: string, aktivitasRbaId: string, rincianRbaBelanjaId: string};
  "/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/:aktivitasRbaId/rincian-rba/rab/tambah": {rbaId: string, aktivitasRbaId: string};
  "/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/:aktivitasRbaId/edit": {rbaId: string, aktivitasRbaId: string};
  "/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/tambah": {rbaId: string};
  "/sipeka/anggaran/rba/daftar-rap/:rapId/edit": {rapId: string};
  "/sipeka/anggaran/rba/daftar-rab/:rabId/edit": {rabId: string};
  "/sipeka/anggaran/monitoring/realisasi-belanja/:rincianRbaBelanjaId/edit": {rincianRbaBelanjaId: string};
  "/sipeka/anggaran/monitoring/realisasi-belanja/:rincianRbaBelanjaId/detail-belanja": {rincianRbaBelanjaId: string};
  "/sipeka/anggaran/dba/penetapan/:dbaId/edit": {dbaId: string};
  "/sipeka/akuntansi/sp3b/:sp3bId": {sp3bId: string};
  "/sipeka/akuntansi/sp3b/:sp3bId/edit": {sp3bId: string};
  "/sipeka/akuntansi/sp3b/:sp3bId/cetak-surat-pengantar": {sp3bId: string};
  "/sipeka/akuntansi/sp3b/:sp3bId/cetak-sptjb-pendapatan": {sp3bId: string};
  "/sipeka/akuntansi/sp3b/:sp3bId/cetak-sptjb-belanja": {sp3bId: string};
  "/sipeka/akuntansi/sp3b/:sp3bId/cetak-sp3b": {sp3bId: string};
  "/sipeka/akuntansi/rekening-koran/:rekeningBankId": {rekeningBankId: string};
  "/sipeka/akuntansi/rekening-koran/:rekeningBankId/:rekeningKoranId/edit": {rekeningBankId: string, rekeningKoranId: string};
  "/sipeka/akuntansi/lra/:kodeRekening": {kodeRekening: string}
}

export const routes: DataRouteObject[] = [
{
      id: "src/app/layout.tsx",
      path: "/",
      Component: React.lazy(() => import("src/app/layout.tsx")),
      children: [{
      id: "src/app/page.tsx",
      path: "/",
      Component: React.lazy(() => import("src/app/page.tsx")),
      children: []
    },{
      id: "src/app/panduan/layout.tsx",
      path: "/panduan",
      Component: React.lazy(() => import("src/app/panduan/layout.tsx")),
      children: [{
      id: "src/app/panduan/page.tsx",
      path: "/panduan",
      Component: React.lazy(() => import("src/app/panduan/page.tsx")),
      children: []
    },{
      id: "src/app/panduan/tech-stack/page.tsx",
      path: "/panduan/tech-stack",
      Component: React.lazy(() => import("src/app/panduan/tech-stack/page.tsx")),
      children: []
    },{
      id: "src/app/panduan/pengenalan/page.tsx",
      path: "/panduan/pengenalan",
      Component: React.lazy(() => import("src/app/panduan/pengenalan/page.tsx")),
      children: []
    },{
      id: "src/app/panduan/pendaftaran/page.tsx",
      path: "/panduan/pendaftaran",
      Component: React.lazy(() => import("src/app/panduan/pendaftaran/page.tsx")),
      children: []
    },{
      id: "src/app/panduan/login/page.tsx",
      path: "/panduan/login",
      Component: React.lazy(() => import("src/app/panduan/login/page.tsx")),
      children: []
    },{
      id: "src/app/panduan/faq/page.tsx",
      path: "/panduan/faq",
      Component: React.lazy(() => import("src/app/panduan/faq/page.tsx")),
      children: []
    }]
    },{
      id: "src/app/(dashboard)/middleware.tsx",
      path: "/",
      Component: React.lazy(() => import("src/app/(dashboard)/middleware.tsx")),
      children: [{
      id: "src/app/(dashboard)/sipeka/layout.tsx",
      path: "/sipeka",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/layout.tsx")),
      children: [{
      id: "src/app/(dashboard)/sipeka/page.tsx",
      path: "/sipeka",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/pendapatan/layout.tsx",
      path: "/sipeka/pendapatan",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/pendapatan/layout.tsx")),
      children: [{
      id: "src/app/(dashboard)/sipeka/pendapatan/perekaman/page.tsx",
      path: "/sipeka/pendapatan/perekaman",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/pendapatan/perekaman/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/pendapatan/perekaman/[pendapatanId]/edit/page.tsx",
      path: "/sipeka/pendapatan/perekaman/:pendapatanId/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/pendapatan/perekaman/[pendapatanId]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/pendapatan/perekaman/tambah/page.tsx",
      path: "/sipeka/pendapatan/perekaman/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/pendapatan/perekaman/tambah/page.tsx")),
      children: []
    }]
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/layout.tsx",
      path: "/sipeka/lainnya",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/layout.tsx")),
      children: [{
      id: "src/app/(dashboard)/sipeka/lainnya/page.tsx",
      path: "/sipeka/lainnya",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/user/page.tsx",
      path: "/sipeka/lainnya/user",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/user/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/user/(toolbox)/middleware.tsx",
      path: "/sipeka/lainnya/user",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/user/(toolbox)/middleware.tsx")),
      children: [{
      id: "src/app/(dashboard)/sipeka/lainnya/user/(toolbox)/[id]/edit/page.tsx",
      path: "/sipeka/lainnya/user/:id/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/user/(toolbox)/[id]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/user/(toolbox)/tambah/page.tsx",
      path: "/sipeka/lainnya/user/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/user/(toolbox)/tambah/page.tsx")),
      children: []
    }]
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/referensi/layout.tsx",
      path: "/sipeka/lainnya/referensi",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/referensi/layout.tsx")),
      children: [{
      id: "src/app/(dashboard)/sipeka/lainnya/referensi/kode-rekening/layout.tsx",
      path: "/sipeka/lainnya/referensi/kode-rekening",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/referensi/kode-rekening/layout.tsx")),
      children: [{
      id: "src/app/(dashboard)/sipeka/lainnya/referensi/kode-rekening/[level]/page.tsx",
      path: "/sipeka/lainnya/referensi/kode-rekening/:level",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/referensi/kode-rekening/[level]/page.tsx")),
      children: []
    }]
    }]
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/pengaturan/layout.tsx",
      path: "/sipeka/lainnya/pengaturan",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/pengaturan/layout.tsx")),
      children: [{
      id: "src/app/(dashboard)/sipeka/lainnya/pengaturan/rekening-bank/page.tsx",
      path: "/sipeka/lainnya/pengaturan/rekening-bank",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/pengaturan/rekening-bank/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/pengaturan/rekening-bank/[id]/edit/page.tsx",
      path: "/sipeka/lainnya/pengaturan/rekening-bank/:id/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/pengaturan/rekening-bank/[id]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/pengaturan/rekening-bank/tambah/page.tsx",
      path: "/sipeka/lainnya/pengaturan/rekening-bank/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/pengaturan/rekening-bank/tambah/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/pengaturan/profil-blud/page.tsx",
      path: "/sipeka/lainnya/pengaturan/profil-blud",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/pengaturan/profil-blud/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/pengaturan/pengelola-blud/page.tsx",
      path: "/sipeka/lainnya/pengaturan/pengelola-blud",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/pengaturan/pengelola-blud/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/pengaturan/pengelola-blud/[id]/edit/page.tsx",
      path: "/sipeka/lainnya/pengaturan/pengelola-blud/:id/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/pengaturan/pengelola-blud/[id]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/pengaturan/pengelola-blud/tambah/page.tsx",
      path: "/sipeka/lainnya/pengaturan/pengelola-blud/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/pengaturan/pengelola-blud/tambah/page.tsx")),
      children: []
    }]
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/database/layout.tsx",
      path: "/sipeka/lainnya/database",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/database/layout.tsx")),
      children: [{
      id: "src/app/(dashboard)/sipeka/lainnya/database/unit-kerja/page.tsx",
      path: "/sipeka/lainnya/database/unit-kerja",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/database/unit-kerja/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/database/unit-kerja/[id]/edit/page.tsx",
      path: "/sipeka/lainnya/database/unit-kerja/:id/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/database/unit-kerja/[id]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/database/unit-kerja/tambah/page.tsx",
      path: "/sipeka/lainnya/database/unit-kerja/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/database/unit-kerja/tambah/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/database/rekanan/page.tsx",
      path: "/sipeka/lainnya/database/rekanan",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/database/rekanan/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/database/rekanan/[id]/edit/page.tsx",
      path: "/sipeka/lainnya/database/rekanan/:id/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/database/rekanan/[id]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/database/rekanan/tambah/page.tsx",
      path: "/sipeka/lainnya/database/rekanan/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/database/rekanan/tambah/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/database/pegawai/page.tsx",
      path: "/sipeka/lainnya/database/pegawai",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/database/pegawai/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/database/pegawai/[id]/edit/page.tsx",
      path: "/sipeka/lainnya/database/pegawai/:id/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/database/pegawai/[id]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/database/pegawai/tambah/page.tsx",
      path: "/sipeka/lainnya/database/pegawai/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/database/pegawai/tambah/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/database/bank/page.tsx",
      path: "/sipeka/lainnya/database/bank",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/database/bank/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/database/bank/[id]/edit/page.tsx",
      path: "/sipeka/lainnya/database/bank/:id/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/database/bank/[id]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/lainnya/database/bank/tambah/page.tsx",
      path: "/sipeka/lainnya/database/bank/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/lainnya/database/bank/tambah/page.tsx")),
      children: []
    }]
    }]
    },{
      id: "src/app/(dashboard)/sipeka/integrasi/page.tsx",
      path: "/sipeka/integrasi",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/integrasi/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/integrasi/sipd/middleware.tsx",
      path: "/sipeka/integrasi/sipd",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/integrasi/sipd/middleware.tsx")),
      children: [{
      id: "src/app/(dashboard)/sipeka/integrasi/sipd/layout.tsx",
      path: "/sipeka/integrasi/sipd",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/integrasi/sipd/layout.tsx")),
      children: [{
      id: "src/app/(dashboard)/sipeka/integrasi/sipd/tna/page.tsx",
      path: "/sipeka/integrasi/sipd/tna",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/integrasi/sipd/tna/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/integrasi/sipd/profil/page.tsx",
      path: "/sipeka/integrasi/sipd/profil",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/integrasi/sipd/profil/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/integrasi/sipd/login/page.tsx",
      path: "/sipeka/integrasi/sipd/login",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/integrasi/sipd/login/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/integrasi/sipd/cetak-lra/page.tsx",
      path: "/sipeka/integrasi/sipd/cetak-lra",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/integrasi/sipd/cetak-lra/page.tsx")),
      children: []
    }]
    }]
    },{
      id: "src/app/(dashboard)/sipeka/belanja/layout.tsx",
      path: "/sipeka/belanja",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/layout.tsx")),
      children: [{
      id: "src/app/(dashboard)/sipeka/belanja/spp/page.tsx",
      path: "/sipeka/belanja/spp",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/spp/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/spp/[sppId]/page.tsx",
      path: "/sipeka/belanja/spp/:sppId",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/spp/[sppId]/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/spp/[sppId]/edit/page.tsx",
      path: "/sipeka/belanja/spp/:sppId/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/spp/[sppId]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/spp/[sppId]/cetak-surat-pengantar/page.tsx",
      path: "/sipeka/belanja/spp/:sppId/cetak-surat-pengantar",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/spp/[sppId]/cetak-surat-pengantar/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/spp/[sppId]/cetak-spp-rincian/page.tsx",
      path: "/sipeka/belanja/spp/:sppId/cetak-spp-rincian",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/spp/[sppId]/cetak-spp-rincian/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/spp/[sppId]/cetak-spp/page.tsx",
      path: "/sipeka/belanja/spp/:sppId/cetak-spp",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/spp/[sppId]/cetak-spp/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/spp/tambah/page.tsx",
      path: "/sipeka/belanja/spp/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/spp/tambah/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/spm/page.tsx",
      path: "/sipeka/belanja/spm",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/spm/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/spm/[spmId]/page.tsx",
      path: "/sipeka/belanja/spm/:spmId",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/spm/[spmId]/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/spm/[spmId]/edit/page.tsx",
      path: "/sipeka/belanja/spm/:spmId/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/spm/[spmId]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/spm/[spmId]/cetak-sptjm/page.tsx",
      path: "/sipeka/belanja/spm/:spmId/cetak-sptjm",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/spm/[spmId]/cetak-sptjm/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/spm/[spmId]/cetak-spm/page.tsx",
      path: "/sipeka/belanja/spm/:spmId/cetak-spm",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/spm/[spmId]/cetak-spm/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/spm/[spmId]/cetak-pernyataan-verifikasi/page.tsx",
      path: "/sipeka/belanja/spm/:spmId/cetak-pernyataan-verifikasi",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/spm/[spmId]/cetak-pernyataan-verifikasi/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/spm/tambah/page.tsx",
      path: "/sipeka/belanja/spm/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/spm/tambah/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/sp2d/page.tsx",
      path: "/sipeka/belanja/sp2d",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/sp2d/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/sp2d/[sp2dId]/page.tsx",
      path: "/sipeka/belanja/sp2d/:sp2dId",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/sp2d/[sp2dId]/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/sp2d/[sp2dId]/edit/page.tsx",
      path: "/sipeka/belanja/sp2d/:sp2dId/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/sp2d/[sp2dId]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/sp2d/[sp2dId]/cetak-sp2d/page.tsx",
      path: "/sipeka/belanja/sp2d/:sp2dId/cetak-sp2d",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/sp2d/[sp2dId]/cetak-sp2d/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/sp2d/[sp2dId]/cetak-kendali-cek/page.tsx",
      path: "/sipeka/belanja/sp2d/:sp2dId/cetak-kendali-cek",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/sp2d/[sp2dId]/cetak-kendali-cek/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/sp2d/tambah/page.tsx",
      path: "/sipeka/belanja/sp2d/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/sp2d/tambah/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/perekaman/page.tsx",
      path: "/sipeka/belanja/perekaman",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/perekaman/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/perekaman/[belanjaId]/page.tsx",
      path: "/sipeka/belanja/perekaman/:belanjaId",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/perekaman/[belanjaId]/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/perekaman/[belanjaId]/upload/page.tsx",
      path: "/sipeka/belanja/perekaman/:belanjaId/upload",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/perekaman/[belanjaId]/upload/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/perekaman/[belanjaId]/potongan/[potonganId]/edit/page.tsx",
      path: "/sipeka/belanja/perekaman/:belanjaId/potongan/:potonganId/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/perekaman/[belanjaId]/potongan/[potonganId]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/perekaman/[belanjaId]/potongan/tambah/page.tsx",
      path: "/sipeka/belanja/perekaman/:belanjaId/potongan/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/perekaman/[belanjaId]/potongan/tambah/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/perekaman/[belanjaId]/edit/page.tsx",
      path: "/sipeka/belanja/perekaman/:belanjaId/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/perekaman/[belanjaId]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/perekaman/[belanjaId]/cetak-setoran-bank/page.tsx",
      path: "/sipeka/belanja/perekaman/:belanjaId/cetak-setoran-bank",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/perekaman/[belanjaId]/cetak-setoran-bank/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/perekaman/[belanjaId]/cetak-kwitansi/page.tsx",
      path: "/sipeka/belanja/perekaman/:belanjaId/cetak-kwitansi",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/perekaman/[belanjaId]/cetak-kwitansi/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/perekaman/[belanjaId]/cetak-daftar-potong/page.tsx",
      path: "/sipeka/belanja/perekaman/:belanjaId/cetak-daftar-potong",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/perekaman/[belanjaId]/cetak-daftar-potong/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/perekaman/[belanjaId]/cetak-amplop/page.tsx",
      path: "/sipeka/belanja/perekaman/:belanjaId/cetak-amplop",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/perekaman/[belanjaId]/cetak-amplop/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/perekaman/tambah/page.tsx",
      path: "/sipeka/belanja/perekaman/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/perekaman/tambah/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/lpj-belanja/page.tsx",
      path: "/sipeka/belanja/lpj-belanja",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/lpj-belanja/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/lpj-belanja/[lpjBelanjaId]/page.tsx",
      path: "/sipeka/belanja/lpj-belanja/:lpjBelanjaId",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/lpj-belanja/[lpjBelanjaId]/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/lpj-belanja/[lpjBelanjaId]/tambah-belanja/page.tsx",
      path: "/sipeka/belanja/lpj-belanja/:lpjBelanjaId/tambah-belanja",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/lpj-belanja/[lpjBelanjaId]/tambah-belanja/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/lpj-belanja/[lpjBelanjaId]/edit/page.tsx",
      path: "/sipeka/belanja/lpj-belanja/:lpjBelanjaId/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/lpj-belanja/[lpjBelanjaId]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/lpj-belanja/[lpjBelanjaId]/cetak/page.tsx",
      path: "/sipeka/belanja/lpj-belanja/:lpjBelanjaId/cetak",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/lpj-belanja/[lpjBelanjaId]/cetak/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/lpj-belanja/tambah/page.tsx",
      path: "/sipeka/belanja/lpj-belanja/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/lpj-belanja/tambah/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/buku/layout.tsx",
      path: "/sipeka/belanja/buku",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/buku/layout.tsx")),
      children: [{
      id: "src/app/(dashboard)/sipeka/belanja/buku/kas-umum/page.tsx",
      path: "/sipeka/belanja/buku/kas-umum",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/buku/kas-umum/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/buku/buku-pajak/page.tsx",
      path: "/sipeka/belanja/buku/buku-pajak",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/buku/buku-pajak/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/belanja/buku/buku-pajak/cetak/page.tsx",
      path: "/sipeka/belanja/buku/buku-pajak/cetak",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/belanja/buku/buku-pajak/cetak/page.tsx")),
      children: []
    }]
    }]
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/page.tsx",
      path: "/sipeka/anggaran",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/rba/layout.tsx",
      path: "/sipeka/anggaran/rba",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/rba/layout.tsx")),
      children: [{
      id: "src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/page.tsx",
      path: "/sipeka/anggaran/rba/penyusunan-rba",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/edit/page.tsx",
      path: "/sipeka/anggaran/rba/penyusunan-rba/:rbaId/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/(detail)/layout.tsx",
      path: "/sipeka/anggaran/rba/penyusunan-rba/:rbaId",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/(detail)/layout.tsx")),
      children: [{
      id: "src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/(detail)/aktivitas/page.tsx",
      path: "/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/(detail)/aktivitas/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/(detail)/aktivitas/[aktivitasRbaId]/rincian-rba/page.tsx",
      path: "/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/:aktivitasRbaId/rincian-rba",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/(detail)/aktivitas/[aktivitasRbaId]/rincian-rba/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/(detail)/aktivitas/[aktivitasRbaId]/rincian-rba/rap/[rincianRbaPendapatanId]/edit/page.tsx",
      path: "/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/:aktivitasRbaId/rincian-rba/rap/:rincianRbaPendapatanId/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/(detail)/aktivitas/[aktivitasRbaId]/rincian-rba/rap/[rincianRbaPendapatanId]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/(detail)/aktivitas/[aktivitasRbaId]/rincian-rba/rap/tambah/page.tsx",
      path: "/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/:aktivitasRbaId/rincian-rba/rap/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/(detail)/aktivitas/[aktivitasRbaId]/rincian-rba/rap/tambah/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/(detail)/aktivitas/[aktivitasRbaId]/rincian-rba/rab/[rincianRbaBelanjaId]/edit/page.tsx",
      path: "/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/:aktivitasRbaId/rincian-rba/rab/:rincianRbaBelanjaId/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/(detail)/aktivitas/[aktivitasRbaId]/rincian-rba/rab/[rincianRbaBelanjaId]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/(detail)/aktivitas/[aktivitasRbaId]/rincian-rba/rab/tambah/page.tsx",
      path: "/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/:aktivitasRbaId/rincian-rba/rab/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/(detail)/aktivitas/[aktivitasRbaId]/rincian-rba/rab/tambah/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/(detail)/aktivitas/[aktivitasRbaId]/edit/page.tsx",
      path: "/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/:aktivitasRbaId/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/(detail)/aktivitas/[aktivitasRbaId]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/(detail)/aktivitas/tambah/page.tsx",
      path: "/sipeka/anggaran/rba/penyusunan-rba/:rbaId/aktivitas/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/[rbaId]/(detail)/aktivitas/tambah/page.tsx")),
      children: []
    }]
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/tambah/page.tsx",
      path: "/sipeka/anggaran/rba/penyusunan-rba/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/rba/penyusunan-rba/tambah/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/rba/daftar-rap/page.tsx",
      path: "/sipeka/anggaran/rba/daftar-rap",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/rba/daftar-rap/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/rba/daftar-rap/[rapId]/edit/page.tsx",
      path: "/sipeka/anggaran/rba/daftar-rap/:rapId/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/rba/daftar-rap/[rapId]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/rba/daftar-rap/tambah/page.tsx",
      path: "/sipeka/anggaran/rba/daftar-rap/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/rba/daftar-rap/tambah/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/rba/daftar-rab/page.tsx",
      path: "/sipeka/anggaran/rba/daftar-rab",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/rba/daftar-rab/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/rba/daftar-rab/[rabId]/edit/page.tsx",
      path: "/sipeka/anggaran/rba/daftar-rab/:rabId/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/rba/daftar-rab/[rabId]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/rba/daftar-rab/tambah/page.tsx",
      path: "/sipeka/anggaran/rba/daftar-rab/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/rba/daftar-rab/tambah/page.tsx")),
      children: []
    }]
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/monitoring/layout.tsx",
      path: "/sipeka/anggaran/monitoring",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/monitoring/layout.tsx")),
      children: [{
      id: "src/app/(dashboard)/sipeka/anggaran/monitoring/realisasi-belanja/layout.tsx",
      path: "/sipeka/anggaran/monitoring/realisasi-belanja",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/monitoring/realisasi-belanja/layout.tsx")),
      children: [{
      id: "src/app/(dashboard)/sipeka/anggaran/monitoring/realisasi-belanja/page.tsx",
      path: "/sipeka/anggaran/monitoring/realisasi-belanja",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/monitoring/realisasi-belanja/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/monitoring/realisasi-belanja/[rincianRbaBelanjaId]/edit/page.tsx",
      path: "/sipeka/anggaran/monitoring/realisasi-belanja/:rincianRbaBelanjaId/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/monitoring/realisasi-belanja/[rincianRbaBelanjaId]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/monitoring/realisasi-belanja/[rincianRbaBelanjaId]/detail-belanja/page.tsx",
      path: "/sipeka/anggaran/monitoring/realisasi-belanja/:rincianRbaBelanjaId/detail-belanja",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/monitoring/realisasi-belanja/[rincianRbaBelanjaId]/detail-belanja/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/monitoring/realisasi-belanja/tidak-terklasifikasi/page.tsx",
      path: "/sipeka/anggaran/monitoring/realisasi-belanja/tidak-terklasifikasi",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/monitoring/realisasi-belanja/tidak-terklasifikasi/page.tsx")),
      children: []
    }]
    }]
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/dba/layout.tsx",
      path: "/sipeka/anggaran/dba",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/dba/layout.tsx")),
      children: [{
      id: "src/app/(dashboard)/sipeka/anggaran/dba/penetapan/page.tsx",
      path: "/sipeka/anggaran/dba/penetapan",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/dba/penetapan/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/dba/penetapan/[dbaId]/edit/page.tsx",
      path: "/sipeka/anggaran/dba/penetapan/:dbaId/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/dba/penetapan/[dbaId]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/anggaran/dba/penetapan/tambah/page.tsx",
      path: "/sipeka/anggaran/dba/penetapan/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/anggaran/dba/penetapan/tambah/page.tsx")),
      children: []
    }]
    },{
      id: "src/app/(dashboard)/sipeka/akuntansi/page.tsx",
      path: "/sipeka/akuntansi",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/akuntansi/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/akuntansi/sp3b/page.tsx",
      path: "/sipeka/akuntansi/sp3b",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/akuntansi/sp3b/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/akuntansi/sp3b/[sp3bId]/page.tsx",
      path: "/sipeka/akuntansi/sp3b/:sp3bId",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/akuntansi/sp3b/[sp3bId]/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/akuntansi/sp3b/[sp3bId]/edit/page.tsx",
      path: "/sipeka/akuntansi/sp3b/:sp3bId/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/akuntansi/sp3b/[sp3bId]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/akuntansi/sp3b/[sp3bId]/cetak-surat-pengantar/page.tsx",
      path: "/sipeka/akuntansi/sp3b/:sp3bId/cetak-surat-pengantar",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/akuntansi/sp3b/[sp3bId]/cetak-surat-pengantar/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/akuntansi/sp3b/[sp3bId]/cetak-sptjb-pendapatan/page.tsx",
      path: "/sipeka/akuntansi/sp3b/:sp3bId/cetak-sptjb-pendapatan",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/akuntansi/sp3b/[sp3bId]/cetak-sptjb-pendapatan/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/akuntansi/sp3b/[sp3bId]/cetak-sptjb-belanja/page.tsx",
      path: "/sipeka/akuntansi/sp3b/:sp3bId/cetak-sptjb-belanja",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/akuntansi/sp3b/[sp3bId]/cetak-sptjb-belanja/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/akuntansi/sp3b/[sp3bId]/cetak-sp3b/page.tsx",
      path: "/sipeka/akuntansi/sp3b/:sp3bId/cetak-sp3b",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/akuntansi/sp3b/[sp3bId]/cetak-sp3b/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/akuntansi/sp3b/tambah/page.tsx",
      path: "/sipeka/akuntansi/sp3b/tambah",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/akuntansi/sp3b/tambah/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/akuntansi/rekening-koran/page.tsx",
      path: "/sipeka/akuntansi/rekening-koran",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/akuntansi/rekening-koran/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/akuntansi/rekening-koran/[rekeningBankId]/page.tsx",
      path: "/sipeka/akuntansi/rekening-koran/:rekeningBankId",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/akuntansi/rekening-koran/[rekeningBankId]/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/akuntansi/rekening-koran/[rekeningBankId]/[rekeningKoranId]/edit/page.tsx",
      path: "/sipeka/akuntansi/rekening-koran/:rekeningBankId/:rekeningKoranId/edit",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/akuntansi/rekening-koran/[rekeningBankId]/[rekeningKoranId]/edit/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/akuntansi/rekening-koran/import/page.tsx",
      path: "/sipeka/akuntansi/rekening-koran/import",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/akuntansi/rekening-koran/import/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/akuntansi/lra/page.tsx",
      path: "/sipeka/akuntansi/lra",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/akuntansi/lra/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/akuntansi/lra/[kodeRekening]/page.tsx",
      path: "/sipeka/akuntansi/lra/:kodeRekening",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/akuntansi/lra/[kodeRekening]/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/sipeka/akuntansi/lra/cetak/page.tsx",
      path: "/sipeka/akuntansi/lra/cetak",
      Component: React.lazy(() => import("src/app/(dashboard)/sipeka/akuntansi/lra/cetak/page.tsx")),
      children: []
    }]
    },{
      id: "src/app/(dashboard)/profil/layout.tsx",
      path: "/profil",
      Component: React.lazy(() => import("src/app/(dashboard)/profil/layout.tsx")),
      children: [{
      id: "src/app/(dashboard)/profil/page.tsx",
      path: "/profil",
      Component: React.lazy(() => import("src/app/(dashboard)/profil/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/profil/ganti-password/page.tsx",
      path: "/profil/ganti-password",
      Component: React.lazy(() => import("src/app/(dashboard)/profil/ganti-password/page.tsx")),
      children: []
    }]
    },{
      id: "src/app/(dashboard)/myatma/layout.tsx",
      path: "/myatma",
      Component: React.lazy(() => import("src/app/(dashboard)/myatma/layout.tsx")),
      children: [{
      id: "src/app/(dashboard)/myatma/page.tsx",
      path: "/myatma",
      Component: React.lazy(() => import("src/app/(dashboard)/myatma/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/myatma/tunjangan/page.tsx",
      path: "/myatma/tunjangan",
      Component: React.lazy(() => import("src/app/(dashboard)/myatma/tunjangan/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/myatma/jasa-pelayanan/page.tsx",
      path: "/myatma/jasa-pelayanan",
      Component: React.lazy(() => import("src/app/(dashboard)/myatma/jasa-pelayanan/page.tsx")),
      children: []
    },{
      id: "src/app/(dashboard)/myatma/gaji/page.tsx",
      path: "/myatma/gaji",
      Component: React.lazy(() => import("src/app/(dashboard)/myatma/gaji/page.tsx")),
      children: []
    }]
    }]
    },{
      id: "src/app/(auth)/middleware.tsx",
      path: "/",
      Component: React.lazy(() => import("src/app/(auth)/middleware.tsx")),
      children: [{
      id: "src/app/(auth)/layout.tsx",
      path: "/",
      Component: React.lazy(() => import("src/app/(auth)/layout.tsx")),
      children: [{
      id: "src/app/(auth)/register/page.tsx",
      path: "/register",
      Component: React.lazy(() => import("src/app/(auth)/register/page.tsx")),
      children: []
    },{
      id: "src/app/(auth)/login/page.tsx",
      path: "/login",
      Component: React.lazy(() => import("src/app/(auth)/login/page.tsx")),
      children: []
    }]
    }]
    }]
    }
];

// This is a workaround for the fact that react-router does not support dynamic imports in the routes array

// Link is a wrapper around react-router's Link component

export type To<Pathname = string> = {
  pathname: Pathname;
  search?: string;
  hash?: string;
};

type ComponentProps<
  Path extends string | To,
  Params extends Record<string, any>,
> = Path extends keyof Params
  ? { to: Path; params: Params[Path] }
  : Path extends { pathname: infer Pathname }
    ? Pathname extends keyof Params
      ? { to: To<Pathname>; params: Params[Pathname] }
      : { to: To<Pathname>; params?: never }
    : { to: Path; params?: never };

export type LinkProps<
  Path extends string | To,
  Params extends Record<string, any>,
> = Omit<_LinkProps, "to"> & ComponentProps<Path, Params>;

type LinkRef = React.ForwardedRef<HTMLAnchorElement>;

export const Link = React.forwardRef(
  <P extends Paths | To<Paths>>(
    { to, params, ...props }: LinkProps<P, Params>,
    ref: LinkRef,
  ) => {
    const path = generatePath(
      typeof to === "string" ? to : to.pathname,
      params || ({} as any),
    );
    return (
      <_Link
        ref={ref}
        {...props}
        to={
          typeof to === "string"
            ? path
            : { pathname: path, search: to.search, hash: to.hash }
        }
      />
    );
  },
);

// Navigate is a wrapper around react-router's Navigate component

export const Navigate =  <P extends Paths | To<Paths>>({ to, params, ...props }: LinkProps<P, Params>) => {
  const path = generatePath(typeof to === 'string' ? to : to.pathname, params || ({} as any))
  return (
    <_Navigate
      {...props}
      to={typeof to === 'string' ? path : { pathname: path, search: to.search, hash: to.hash }}
    />
  )
}

// useParams is a hook that returns the params of the current route

export const useParams = <P extends keyof Params>(path: P) =>
  _useParams<Params[typeof path]>() as Params[P];

// useNavigate is a hook that returns the navigate function of the current route


export type NavigateOptions<Path extends string | To | number, Params extends Record<string, any>> = Path extends number
  ? []
  : Path extends keyof Params
    ? [_NavigateOptions & { params: Params[Path] }]
    : Path extends { pathname: infer Pathname }
      ? Pathname extends keyof Params
        ? [_NavigateOptions & { params: Params[Pathname] }]
        : [_NavigateOptions & { params?: never }] | []
      : [_NavigateOptions & { params?: never }] | []

export const useNavigate = () => {
  const navigate = _useNavigate()

      return React.useCallback(
        <P extends Paths | To<Paths> | number>(to: P, ...[options]: NavigateOptions<P, Params>) => {
          if (typeof to === 'number') return navigate(to)
          const path = generatePath(typeof to === 'string' ? to : to.pathname, options?.params || ({} as any))
          return navigate(typeof to === 'string' ? path : { pathname: path, search: to.search, hash: to.hash }, options)
        },
        [navigate],
      )
}

