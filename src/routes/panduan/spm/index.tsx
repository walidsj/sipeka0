import { createFileRoute } from "@tanstack/react-router";

function Page() {
  return (
    <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-3xl font-extrabold">SPM (Surat Perintah Membayar)</h2>
      <div className="py-8 text-justify">
        <p className="mb-5">
          SPM (Surat Perintah Membayar) adalah dokumen perintah membayar yang
          dikeluarkan oleh Kepala Satker kepada KPPN (Kantor Pelayanan
          Perbendaharaan Negara) atau bank persepsi. SPM merupakan kelanjutan
          dari SPP yang sudah divalidasi.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Mengakses SPM</h3>
        <p className="mb-5">
          Buka menu <strong>Belanja</strong> lalu pilih <strong>SPM</strong>. Tabel
          akan menampilkan daftar SPM dengan informasi tanggal, nomor dokumen,
          uraian SPP terkait, jenis, jumlah, dan status SP2D.
        </p>
        <p className="mb-5">
          Akses: <strong>Belanja</strong> &gt; <strong>SPM</strong>
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Menambah SPM</h3>
        <ol className="mb-5 list-inside list-decimal space-y-2">
          <li>Klik tombol <strong>Tambah</strong> di pojok kanan atas.</li>
          <li>Isi tanggal dokumen dan nomor dokumen SPM.</li>
          <li>Pilih SPP terkait dari daftar SPP yang tersedia.</li>
          <li>Isi uraian SPM.</li>
          <li>Klik <strong>Simpan</strong>.</li>
        </ol>
        <p className="mb-5">
          SPM hanya bisa dibuat untuk SPP yang belum memiliki SPM. Jika SPP
          sudah terkait dengan SPM, SPP tersebut tidak akan muncul di daftar
          pemilihan.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Filter dan Pencarian</h3>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li>
            <strong>MonthFilter:</strong> Filter berdasarkan periode tanggal
            dokumen SPM.
          </li>
          <li>
            <strong>Pencarian:</strong> Cari berdasarkan nomor dokumen atau
            uraian SPP terkait.
          </li>
          <li>
            <strong>Filter SP2D:</strong> Tampilkan SPM yang sudah/sbelum
            memiliki SP2D.
          </li>
        </ul>

        <h3 className="mb-3 mt-8 text-xl font-bold">Mencetak SPM</h3>
        <p className="mb-5">
          Klik tombol <strong>Aksi</strong> lalu pilih <strong>Cetak</strong> untuk
          mencetak dokumen SPM dalam format resmi. Halaman cetak sudah termasuk
          kop surat dan tanda tangan.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Status SP2D</h3>
        <p className="mb-5">
          Setiap SPM memiliki status terkait SP2D (Surat Perintah Pencairan
          Dana). Jika SPM sudah memiliki SP2D, kolom SP2D akan menampilkan
          nomor SP2D terkait. Jika belum, kolom SP2D akan kosong.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Siklus Pembayaran</h3>
        <p className="mb-5">
          Alur pembayaran BLUD mengikuti siklus: LPJ → SPP → SPM → SP2D.
          Setiap tahapan merupakan prasyarat untuk tahapan berikutnya.
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/panduan/spm/")({
  component: Page,
});
