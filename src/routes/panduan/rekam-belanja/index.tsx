import { createFileRoute } from "@tanstack/react-router";

function Page() {
  return (
    <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-3xl font-extrabold">Rekam Belanja</h2>
      <div className="py-8 text-justify">
        <p className="mb-5">
          Rekam Belanja adalah fitur untuk mencatat seluruh transaksi belanja BLUD.
          Setiap belanja harus terkait dengan kode rekening (RAB) dan LPJ (Laporan
          Pertanggungjawaban) yang sesuai.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Mengakses Rekam Belanja</h3>
        <p className="mb-5">
          Buka menu <strong>Belanja</strong> lalu pilih <strong>Rekam</strong>. Tabel
          akan menampilkan daftar belanja dengan informasi tanggal, nomor dokumen,
          nomor LPJ, kode rekening, uraian, penerima, metode pembayaran, dan jumlah.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Menambah Belanja Baru</h3>
        <ol className="mb-5 list-inside list-decimal space-y-2">
          <li>Klik tombol <strong>Tambah</strong> di pojok kanan atas.</li>
          <li>Isi tanggal dokumen dan nomor dokumen.</li>
          <li>Pilih LPJ terkait dari daftar LPJ yang tersedia.</li>
          <li>Pilih kode rekening (RAB) dari daftar yang tersedia.</li>
          <li>Isi uraian belanja.</li>
          <li>Pilih penerima (rekanan atau pegawai).</li>
          <li>Pilih metode pembayaran (Transfer atau Tunai).</li>
          <li>Isi jumlah belanja.</li>
          <li>Klik <strong>Simpan</strong>.</li>
        </ol>

        <h3 className="mb-3 mt-8 text-xl font-bold">Filter dan Pencarian</h3>
        <p className="mb-5">
          Gunakan <strong>MonthFilter</strong> untuk memfilter berdasarkan periode.
          Gunakan kolom pencarian untuk mencari berdasarkan nomor dokumen, uraian,
          atau nama penerima (rekanan/pegawai).
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Kolom Penerima</h3>
        <p className="mb-5">
          Kolom <strong>Penerima</strong> menampilkan nama penerima belanja. Penerima
          bisa berupa rekanan (mitra/distributor) atau pegawai (jika belanja terkait
          tunjangan/gaji). Nama penerima juga ditampilkan di kolom uraian sebagai
          informasi tambahan.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Metode Pembayaran</h3>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li>
            <strong>Transfer:</strong> Pembayaran melalui transfer bank. Ditandai
            dengan badge biru.
          </li>
          <li>
            <strong>Tunai:</strong> Pembayaran secara tunai.
          </li>
        </ul>

        <h3 className="mb-3 mt-8 text-xl font-bold">Mengelola Belanja</h3>
        <p className="mb-5">
          Klik tombol <strong>Aksi</strong> pada baris belanja untuk:
        </p>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li><strong>Edit:</strong> Mengubah data belanja.</li>
          <li><strong>Upload File:</strong> Mengunggah bukti pendukung (Dokumen).</li>
          <li><strong>Hapus:</strong> Menghapus data belanja (perlu konfirmasi).</li>
        </ul>

        <h3 className="mb-3 mt-8 text-xl font-bold">Pagination</h3>
        <p className="mb-5">
          Tabel belanja menggunakan pagination server-side. Anda bisa mengatur jumlah
          baris per halaman dan navigasi antar halaman di bagian bawah tabel. Kolom
          potongan dapat ditampilkan atau disembunyikan dengan tombol panah di header.
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/panduan/rekam-belanja/")({
  component: Page,
});
