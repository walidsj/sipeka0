import { createFileRoute } from "@tanstack/react-router";

function Page() {
  return (
    <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-3xl font-extrabold">SPP (Surat Perintah Pembayaran)</h2>
      <div className="py-8 text-justify">
        <p className="mb-5">
          SPP (Surat Perintah Pembayaran) adalah dokumen perintah untuk melakukan
          pembayaran yang dikeluarkan oleh Kuasa Pengguna Anggaran kepada
          Bendahara Pengeluaran. SPP menjadi dasar penerbitan SPM oleh
          Kepala Satker.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Mengakses SPP</h3>
        <p className="mb-5">
          Buka menu <strong>Belanja</strong> lalu pilih <strong>SPP</strong>. Tabel
          akan menampilkan daftar SPP dengan informasi tanggal, nomor dokumen,
          uraian LPJ, jenis, jumlah, dan status SPM.
        </p>
        <p className="mb-5">
          Akses: <strong>Belanja</strong> &gt; <strong>SPP</strong>
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Menambah SPP</h3>
        <ol className="mb-5 list-inside list-decimal space-y-2">
          <li>Klik tombol <strong>Tambah</strong> di pojok kanan atas.</li>
          <li>Isi tanggal dokumen dan nomor dokumen SPP.</li>
          <li>Pilih LPJ terkait dari daftar LPJ yang tersedia.</li>
          <li>Isi uraian SPP.</li>
          <li>Klik <strong>Simpan</strong>.</li>
        </ol>
        <p className="mb-5">
          SPP hanya bisa dibuat untuk LPJ yang belum memiliki SPP. Jika LPJ
          sudah terkait dengan SPP, LPJ tersebut tidak akan muncul di daftar
          pemilihan.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Filter dan Pencarian</h3>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li>
            <strong>MonthFilter:</strong> Filter berdasarkan periode tanggal
            dokumen SPP.
          </li>
          <li>
            <strong>Pencarian:</strong> Cari berdasarkan nomor dokumen atau
            uraian LPJ terkait.
          </li>
          <li>
            <strong>Filter SPM:</strong> Tampilkan SPP yang sudah/sbelum
            memiliki SPM.
          </li>
        </ul>

        <h3 className="mb-3 mt-8 text-xl font-bold">Mencetak SPP</h3>
        <p className="mb-5">
          Klik tombol <strong>Aksi</strong> lalu pilih <strong>Cetak</strong> untuk
          mencetak dokumen SPP dalam format resmi. Halaman cetak sudah termasuk
          kop surat dan tanda tangan.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Status SPP</h3>
        <p className="mb-5">
          Setiap SPP memiliki status terkait SPM (Surat Perintah Membayar).
          Jika SPP sudah memiliki SPM, kolom SPM akan menampilkan nomor SPM
          terkait. Jika belum, kolom SPM akan kosong.
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/panduan/spp/")({
  component: Page,
});
