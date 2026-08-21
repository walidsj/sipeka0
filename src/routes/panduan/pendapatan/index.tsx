import { createFileRoute } from "@tanstack/react-router";

function Page() {
  return (
    <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-3xl font-extrabold">Pendapatan</h2>
      <div className="py-8 text-justify">
        <p className="mb-5">
          Modul Pendapatan digunakan untuk mencatat seluruh pendapatan BLUD
          RSJD Atma Husada Mahakam. Pendapatan BLUD berasal dari berbagai
          sumber seperti hasil kerja sama, hibah, iuran, dan lain-lain.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Rekam Pendapatan</h3>
        <p className="mb-5">
          Halaman utama untuk mencatat pendapatan baru. Setiap pendapatan
          memiliki tanggal dokumen, nomor dokumen, uraian, kode rekening,
          jumlah, dan keterangan tambahan.
        </p>
        <p className="mb-5">
          Akses: <strong>Pendapatan</strong> &gt; <strong>Rekam</strong>
        </p>

        <h4 className="mb-2 mt-5 text-lg font-semibold">Menambah Pendapatan Baru</h4>
        <ol className="mb-5 list-inside list-decimal space-y-2">
          <li>Klik tombol <strong>Tambah</strong> di pojok kanan atas.</li>
          <li>Isi tanggal dokumen dan nomor dokumen.</li>
          <li>Pilih kode rekening pendapatan dari daftar yang tersedia.</li>
          <li>Isi uraian pendapatan.</li>
          <li>Isi jumlah pendapatan.</li>
          <li>Isi keterangan tambahan jika diperlukan.</li>
          <li>Klik <strong>Simpan</strong>.</li>
        </ol>

        <h4 className="mb-2 mt-5 text-lg font-semibold">Filter Periode</h4>
        <p className="mb-5">
          Gunakan <strong>MonthFilter</strong> di bagian atas untuk memfilter
          pendapatan berdasarkan periode tanggal. Anda juga bisa mengatur
          jumlah baris per halaman dan menggunakan pencarian untuk mencari
          berdasarkan nomor dokumen atau uraian.
        </p>

        <h4 className="mb-2 mt-5 text-lg font-semibold">Mengelola Pendapatan</h4>
        <p className="mb-5">
          Klik tombol <strong>Aksi</strong> pada baris pendapatan untuk:
        </p>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li><strong>Edit:</strong> Mengubah data pendapatan.</li>
          <li><strong>Hapus:</strong> Menghapus data pendapatan (perlu konfirmasi).</li>
        </ul>

        <h3 className="mb-3 mt-8 text-xl font-bold">Kode Rekening Pendapatan</h3>
        <p className="mb-5">
          Kode rekening pendapatan menggunakan struktur kode rekening daerah
          yang sudah ditetapkan. Kode rekening akan menentukan klasifikasi
          jenis pendapatan (BLUD, APBD, hibah, dll).
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Pagination</h3>
        <p className="mb-5">
          Tabel pendapatan menggunakan pagination server-side. Anda bisa
          mengatur jumlah baris per halaman dan navigasi antar halaman di
          bagian bawah tabel.
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/panduan/pendapatan/")({
  component: Page,
});
