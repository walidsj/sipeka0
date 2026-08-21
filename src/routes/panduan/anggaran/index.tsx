import { createFileRoute } from "@tanstack/react-router";

function Page() {
  return (
    <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-3xl font-extrabold">Anggaran</h2>
      <div className="py-8 text-justify">
        <p className="mb-5">
          Modul Anggaran digunakan untuk mengelola perencanaan dan penganggaran
          BLUD RSJD Atma Husada Mahakam. Modul ini mencakup penyusunan Rencana
          Pendapatan (RAP), Rencana Anggaran Belanja (RAB), serta penetapan
          DBA (Dokumen Pelaksanaan Anggaran).
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Daftar RAP (Rencana Anggaran Pendapatan)</h3>
        <p className="mb-5">
          Halaman ini menampilkan daftar rencana pendapatan BLUD. Setiap RAP
          memiliki kode rekening, uraian, unit kerja, dan sumber dana.
        </p>
        <p className="mb-5">
          Akses: <strong>Anggaran</strong> &gt; <strong>RBA</strong> &gt;{" "}
          <strong>Daftar RAP</strong>
        </p>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li><strong>Tambah RAP:</strong> Klik tombol Tambah, isi kode rekening, uraian, spesifikasi, sumber dana, dan unit kerja.</li>
          <li><strong>Edit RAP:</strong> Klik Aksi lalu Edit pada baris yang ingin diubah.</li>
          <li><strong>Pencarian:</strong> Gunakan kolom pencarian untuk mencari berdasarkan kode rekening atau uraian.</li>
        </ul>

        <h3 className="mb-3 mt-8 text-xl font-bold">Daftar RAB (Rencana Anggaran Belanja)</h3>
        <p className="mb-5">
          Halaman ini menampilkan daftar rencana belanja BLUD. Setiap RAB memiliki
          kode rekening, uraian, spesifikasi, unit kerja, dan sumber dana.
        </p>
        <p className="mb-5">
          Akses: <strong>Anggaran</strong> &gt; <strong>RBA</strong> &gt;{" "}
          <strong>Daftar RAB</strong>
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Penyusunan RBA</h3>
        <p className="mb-5">
          Penyusunan RBA adalah proses utama dalam pengelolaan anggaran. RBA
          terdiri dari aktivitas-aktivitas yang masing-masing memiliki rincian
          belanja atau pendapatan.
        </p>
        <p className="mb-5">
          Akses: <strong>Anggaran</strong> &gt; <strong>RBA</strong> &gt;{" "}
          <strong>Penyusunan RBA</strong>
        </p>
        <ol className="mb-5 list-inside list-decimal space-y-2">
          <li>Buat RBA baru atau pilih RBA yang sudah ada.</li>
          <li>Tambahkan aktivitas-aktivitas ke dalam RBA.</li>
          <li>Untuk setiap aktivitas, tambahkan rincian belanja (RAB) atau rincian pendapatan (RAP).</li>
          <li>Isi volume, satuan, dan harga satuan untuk setiap rincian belanja.</li>
          <li>Nilai anggaran dihitung otomatis: harga × volume.</li>
        </ol>

        <h3 className="mb-3 mt-8 text-xl font-bold">Penetapan DBA</h3>
        <p className="mb-5">
          DBA (Dokumen Pelaksanaan Anggaran) merupakan dokumen resmi yang
          menetapkan anggaran setelah melalui proses penyusunan RBA. DBA
          menjadi acuan dalam pelaksanaan anggaran.
        </p>
        <p className="mb-5">
          Akses: <strong>Anggaran</strong> &gt; <strong>DBA</strong> &gt;{" "}
          <strong>Penetapan</strong>
        </p>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li>DBA terbaru akan otomatis digunakan sebagai acuan anggaran di modul lain (LRA, SPJ Bendahara).</li>
          <li>Hanya DBA terakhir yang diakui oleh sistem.</li>
        </ul>

        <h3 className="mb-3 mt-8 text-xl font-bold">Monitoring Realisasi Belanja</h3>
        <p className="mb-5">
          Halaman ini memantau realisasi belanja per rincian RBA. Anda bisa
          melihat sudah berapa belanja terealisasi dari anggaran yang
          direncanakan, termasuk data yang belum terklasifikasi.
        </p>
        <p className="mb-5">
          Akses: <strong>Anggaran</strong> &gt; <strong>Monitoring</strong> &gt;{" "}
          <strong>Realisasi Belanja</strong>
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/panduan/anggaran/")({
  component: Page,
});
