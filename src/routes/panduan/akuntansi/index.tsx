import { createFileRoute } from "@tanstack/react-router";

function Page() {
  return (
    <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-3xl font-extrabold">Akuntansi</h2>
      <div className="py-8 text-justify">
        <p className="mb-5">
          Modul Akuntansi menyediakan fitur pelaporan keuangan BLUD termasuk
          Laporan Realisasi Anggaran (LRA), Rekening Koran, dan Surat
          Pernyataan Tanggung Jawab Pemotongan dan Penyetoran Pajak (SP3B).
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Laporan Realisasi Anggaran (LRA)</h3>
        <p className="mb-5">
          LRA menampilkan perbandingan antara anggaran dan realisasi belanja
          per kode rekening. LRA merupakan laporan keuangan utama BLUD.
        </p>
        <p className="mb-5">
          Akses: <strong>Akuntansi</strong> &gt; <strong>LRA</strong>
        </p>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li>Gunakan MonthFilter untuk memilih periode laporan.</li>
          <li>Klik Aksi &gt; Detail untuk melihat rincian belanja per kode rekening.</li>
          <li>Klik Aksi &gt; Cetak untuk mencetak LRA dalam format resmi.</li>
        </ul>

        <h3 className="mb-3 mt-8 text-xl font-bold">Rekening Koran</h3>
        <p className="mb-5">
          Rekening Koran adalah catatan transaksi dari bank yang digunakan
          untuk rekonsiliasi data keuangan. Anda bisa mengimpor data rekening
          koran dari file bank.
        </p>
        <p className="mb-5">
          Akses: <strong>Akuntansi</strong> &gt; <strong>Rekening Koran</strong>
        </p>
        <ol className="mb-5 list-inside list-decimal space-y-2">
          <li>Pilih rekening bank yang ingin dilihat.</li>
          <li>Klik <strong>Import</strong> untuk mengunggah file rekening koran dari bank.</li>
          <li>Periksa data yang sudah diimpor dan lakukan pencatatan jika diperlukan.</li>
          <li>Edit atau hapus transaksi yang tidak sesuai.</li>
        </ol>

        <h3 className="mb-3 mt-8 text-xl font-bold">SP3B (Surat Pernyataan Tanggung Jawab Pemotongan dan Penyetoran Pajak)</h3>
        <p className="mb-5">
          SP3B adalah dokumen resmi yang menyatakan bahwa pemotongan dan
          penyetoran pajak sudah dilakukan sesuai ketentuan. Modul ini
          menyediakan fitur untuk membuat, mengelola, dan mencetak SP3B
          beserta dokumen pendukungnya.
        </p>
        <p className="mb-5">
          Akses: <strong>Akuntansi</strong> &gt; <strong>SP3B</strong>
        </p>

        <h4 className="mb-2 mt-5 text-lg font-semibold">Menambah SP3B</h4>
        <ol className="mb-5 list-inside list-decimal space-y-2">
          <li>Klik tombol <strong>Tambah</strong>.</li>
          <li>Isi data SP3B yang diperlukan.</li>
          <li>Klik <strong>Simpan</strong>.</li>
        </ol>

        <h4 className="mb-2 mt-5 text-lg font-semibold">Cetak Dokumen SP3B</h4>
        <p className="mb-5">
          Setiap SP3B memiliki beberapa dokumen cetak:
        </p>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li><strong>Cetak SP3B:</strong> Surat Pernyataan Tanggung Jawab Pemotongan dan Penyetoran Pajak.</li>
          <li><strong>Cetak SPTJB Belanja:</strong> Surat Pernyataan Tanggung Jawab Belanja.</li>
          <li><strong>Cetak SPTJB Pendapatan:</strong> Surat Pernyataan Tanggung Jawab Pendapatan.</li>
          <li><strong>Cetak Surat Pengantar:</strong> Surat pengantar untuk pengiriman dokumen.</li>
        </ul>

        <h4 className="mb-2 mt-5 text-lg font-semibold">Melihat Detail SP3B</h4>
        <p className="mb-5">
          Klik tombol <strong>Aksi</strong> lalu pilih <strong>Detail</strong> untuk
          melihat data SP3B secara lengkap beserta dokumen-dokumen terkait.
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/panduan/akuntansi/")({
  component: Page,
});
