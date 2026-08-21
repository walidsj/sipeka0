import { createFileRoute } from "@tanstack/react-router";

function Page() {
  return (
    <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-3xl font-extrabold">Penyusunan RBA</h2>
      <div className="py-8 text-justify">
        <p className="mb-5">
          RBA (Rencana Bisnis dan Anggaran) adalah dokumen perencanaan tahunan
          BLUD yang memuat rencana pendapatan, belanja, dan pembiayaan. RBA
          menjadi dasar penyusunan DBA (Dokumen Pelaksanaan Anggaran) dan
          acuan dalam pelaksanaan kegiatan operasional BLUD.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Mengakses Penyusunan RBA</h3>
        <p className="mb-5">
          Buka menu <strong>Anggaran</strong> &gt; <strong>RBA</strong> &gt;{" "}
          <strong>Penyusunan RBA</strong>. Halaman akan menampilkan daftar RBA
          yang sudah dibuat.
        </p>
        <p className="mb-5">
          Akses: <strong>Anggaran</strong> &gt; <strong>RBA</strong> &gt;{" "}
          <strong>Penyusunan RBA</strong>
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Membuat RBA Baru</h3>
        <ol className="mb-5 list-inside list-decimal space-y-2">
          <li>Klik tombol <strong>Buat Dokumen</strong>.</li>
          <li>Isi nama dokumen RBA.</li>
          <li>Klik <strong>Simpan</strong>.</li>
        </ol>
        <p className="mb-5">
          RBA yang baru dibuat masih berstatus draft. Anda bisa mengedit dan
          menambahkan aktivitas sebelum RBA ditetapkan.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Struktur RBA</h3>
        <p className="mb-5">
          RBA terdiri dari aktivitas-aktivitas yang mewakili kegiatan operasional
          BLUD. Setiap aktivitas memiliki jenis:
        </p>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li>
            <strong>BELANJA:</strong> Aktivitas yang menghasilkan rincian belanja
            (RAB). Ditandai dengan badge merah.
          </li>
          <li>
            <strong>PENDAPATAN:</strong> Aktivitas yang menghasilkan rincian
            pendapatan (RAP). Ditandai dengan badge hijau.
          </li>
          <li>
            <strong>PEMBIAYAAN:</strong> Aktivitas yang menghasilkan rincian
            pembiayaan. Ditandai dengan badge kuning.
          </li>
        </ul>

        <h3 className="mb-3 mt-8 text-xl font-bold">Langkah Penyusunan</h3>

        <h4 className="mb-2 mt-5 text-lg font-semibold">1. Buat Aktivitas</h4>
        <p className="mb-5">
          Buka detail RBA lalu klik <strong>Tambah</strong> di halaman aktivitas.
          Isi kode aktivitas, nama aktivitas, dan pilih jenis (BELANJA,
          PENDAPATAN, atau PEMBIAYAAN).
        </p>

        <h4 className="mb-2 mt-5 text-lg font-semibold">2. Tambah Rincian</h4>
        <p className="mb-5">
          Buka detail aktivitas lalu klik <strong>Tambah Rincian</strong>.
          Rincian yang ditampilkan tergantung jenis aktivitas:
        </p>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li>
            <strong>Jenis BELANJA → Rincian RAB:</strong> Pilih kode rekening
            belanja (RAB), isi volume, satuan, dan harga satuan. Nilai anggaran
            dihitung otomatis: harga × volume.
          </li>
          <li>
            <strong>Jenis PENDAPATAN → Rincian RAP:</strong> Pilih kode rekening
            pendapatan (RAP), isi volume, satuan, dan harga satuan.
          </li>
        </ul>

        <h4 className="mb-2 mt-5 text-lg font-semibold">3. Hubungkan ke DBA</h4>
        <p className="mb-5">
          Setelah RBA selesai disusun, buka menu <strong>DBA</strong> &gt;{" "}
          <strong>Penetapan</strong> untuk menetapkan RBA sebagai DBA. Hanya
          DBA terbaru yang diakui oleh sistem sebagai acuan anggaran.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Daftar RAB dan RAP</h3>
        <p className="mb-5">
          Selain dari Penyusunan RBA, Anda juga bisa melihat daftar lengkap
          RAB dan RAP di menu:
        </p>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li>
            <strong>Daftar RAB:</strong> Menampilkan seluruh rekening belanja
            yang terdaftar di RAB. Akses: Anggaran &gt; RBA &gt; Daftar RAB.
          </li>
          <li>
            <strong>Daftar RAP:</strong> Menampilkan seluruh rekening pendapatan
            yang terdaftar di RAP. Akses: Anggaran &gt; RBA &gt; Daftar RAP.
          </li>
        </ul>

        <h3 className="mb-3 mt-8 text-xl font-bold">Monitoring Realisasi</h3>
        <p className="mb-5">
          Setelah DBA ditetapkan, Anda bisa memantau realisasi belanja per
          rincian RBA di menu <strong>Anggaran</strong> &gt; <strong>Monitoring</strong> &gt;{" "}
          <strong>Realisasi Belanja</strong>. Halaman ini menunjukkan sudah
          berapa anggaran yang terealisasi dibandingkan dengan anggaran yang
          direncanakan.
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/panduan/rba/")({
  component: Page,
});
