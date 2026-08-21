import { createFileRoute } from "@tanstack/react-router";

function Page() {
  return (
    <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-3xl font-extrabold">SP2D (Surat Perintah Pencairan Dana)</h2>
      <div className="py-8 text-justify">
        <p className="mb-5">
          SP2D (Surat Perintah Pencairan Dana) adalah dokumen perintah pencairan
          dana dari kas negara melalui KPPN kepada bank persepsi. SP2D merupakan
          tahap terakhir dalam siklus pembayaran BLUD sebelum dana cair ke
          penerima.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Mengakses SP2D</h3>
        <p className="mb-5">
          Buka menu <strong>Belanja</strong> lalu pilih <strong>SP2D</strong>. Tabel
          akan menampilkan daftar SP2D dengan informasi tanggal, nomor dokumen,
          uraian SPM terkait, jumlah, nomor cek, dan nama penerima.
        </p>
        <p className="mb-5">
          Akses: <strong>Belanja</strong> &gt; <strong>SP2D</strong>
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Menambah SP2D</h3>
        <ol className="mb-5 list-inside list-decimal space-y-2">
          <li>Klik tombol <strong>Tambah</strong> di pojok kanan atas.</li>
          <li>Isi tanggal dokumen dan nomor dokumen SP2D.</li>
          <li>Pilih SPM terkait dari daftar SPM yang tersedia.</li>
          <li>Isi nomor cek (jika pembayaran menggunakan cek).</li>
          <li>Klik <strong>Simpan</strong>.</li>
        </ol>
        <p className="mb-5">
          SP2D hanya bisa dibuat untuk SPM yang belum memiliki SP2D. Jika SPM
          sudah terkait dengan SP2D, SPM tersebut tidak akan muncul di daftar
          pemilihan.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Filter dan Pencarian</h3>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li>
            <strong>MonthFilter:</strong> Filter berdasarkan periode tanggal
            dokumen SP2D.
          </li>
          <li>
            <strong>Pencarian:</strong> Cari berdasarkan nomor dokumen, nomor
            cek, atau uraian LPJ terkait.
          </li>
        </ul>

        <h3 className="mb-3 mt-8 text-xl font-bold">Mencetak SP2D</h3>
        <p className="mb-5">
          Klik tombol <strong>Aksi</strong> lalu pilih <strong>Cetak</strong> untuk
          mencetak dokumen SP2D dalam format resmi. Halaman cetak sudah termasuk
          kop surat dan tanda tangan.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Informasi Penerima</h3>
        <p className="mb-5">
          Setiap SP2D terkait dengan SPM, yang terkait dengan SPP, yang terkait
          dengan LPJ. Informasi penerima (rekanan atau pegawai) diambil dari
          data belanja dalam LPJ terkait.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Siklus Pembayaran Lengkap</h3>
        <p className="mb-5">
          Alur pembayaran BLUD: <strong>LPJ</strong> → <strong>SPP</strong> →{" "}
          <strong>SPM</strong> → <strong>SP2D</strong>. SP2D merupakan tahap
          akhir di mana dana sudah dicairkan dari kas negara ke rekening
          penerima.
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/panduan/sp2d/")({
  component: Page,
});
