import { createFileRoute } from "@tanstack/react-router";

function Page() {
  return (
    <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-3xl font-extrabold">LPJ Belanja</h2>
      <div className="py-8 text-justify">
        <p className="mb-5">
          Laporan Pertanggungjawaban (LPJ) Belanja adalah dokumen yang berisi
          pertanggungjawaban atas penggunaan uang persediaan (GU/TU) atau
          belanja langsung (LS). LPJ menjadi dokumen penting dalam siklus
          pengelolaan keuangan BLUD.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Mengakses LPJ</h3>
        <p className="mb-5">
          Buka menu <strong>Belanja</strong> lalu pilih <strong>LPJ</strong>. Tabel
          akan menampilkan daftar LPJ dengan informasi tanggal, nomor dokumen,
          uraian, jenis, dan jumlah total belanja terkait.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Jenis LPJ</h3>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li>
            <strong>GU (Ganti Uang Persediaan):</strong> LPJ untuk pertanggungjawaban
            penggunaan uang persediaan yang sudah diganti.
          </li>
          <li>
            <strong>TU (Tambah Uang Persediaan):</strong> LPJ untuk pertanggungjawaban
            penggunaan uang persediaan yang ditambah.
          </li>
          <li>
            <strong>LS (Langsung):</strong> LPJ untuk belanja langsung yang tidak
            melalui uang persediaan.
          </li>
        </ul>

        <h3 className="mb-3 mt-8 text-xl font-bold">Menambah LPJ</h3>
        <ol className="mb-5 list-inside list-decimal space-y-2">
          <li>Klik tombol <strong>Tambah</strong> di pojok kanan atas.</li>
          <li>Isi tanggal dokumen dan nomor dokumen.</li>
          <li>Pilih jenis LPJ (GU, TU, atau LS).</li>
          <li>Isi uraian LPJ.</li>
          <li>Klik <strong>Simpan</strong>.</li>
        </ol>

        <h3 className="mb-3 mt-8 text-xl font-bold">Detail LPJ</h3>
        <p className="mb-5">
          Klik tombol <strong>Aksi</strong> lalu pilih <strong>Detail</strong> untuk
          melihat detail LPJ. Di halaman detail Anda bisa:
        </p>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li>
            <strong>Tambah Belanja:</strong> Menambahkan belanja ke LPJ ini.
          </li>
          <li>
            <strong>Edit:</strong> Mengubah data LPJ.
          </li>
          <li>
            <strong>Cetak:</strong> Mencetak dokumen LPJ dalam format resmi.
          </li>
          <li>
            <strong>Cetak SPJ Bendahara:</strong> Mencetak Surat Pertanggungjawaban
            Bendahara Pengeluaran.
          </li>
          <li>
            <strong>Hapus:</strong> Menghapus LPJ (perlu konfirmasi).
          </li>
        </ul>

        <h3 className="mb-3 mt-8 text-xl font-bold">SPP dan SPM</h3>
        <p className="mb-5">
          LPJ terkait erat dengan SPP (Surat Perintah Pembayaran) dan SPM (Surat
          Perintah Membayar). Status LPJ apakah sudah memiliki SPP atau belum
          bisa dilihat dari indikator di tabel. Gunakan filter untuk melihat LPJ
          yang sudah/sbelum memiliki SPP.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Filter dan Pencarian</h3>
        <p className="mb-5">
          Gunakan <strong>MonthFilter</strong> untuk memfilter berdasarkan periode.
          Gunakan kolom pencarian untuk mencari berdasarkan nomor dokumen atau uraian.
          Anda juga bisa memfilter LPJ yang sudah/sbelum memiliki SPP.
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/panduan/lpj/")({
  component: Page,
});
