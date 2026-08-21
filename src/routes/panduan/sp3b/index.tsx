import { createFileRoute } from "@tanstack/react-router";

function Page() {
  return (
    <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-3xl font-extrabold">SP3B</h2>
      <div className="py-8 text-justify">
        <p className="mb-5">
          SP3B (Surat Pernyataan Tanggung Jawab Pemotongan dan Penyetoran
          Pajak) adalah dokumen pernyataan yang menyatakan bahwa Bendahara
          Pengeluaran BLUD telah melakukan pemotongan dan penyetoran pajak
          sesuai ketentuan perundang-undangan yang berlaku. SP3B merupakan
          salah satu dokumen pertanggungjawaban keuangan BLUD.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Mengakses SP3B</h3>
        <p className="mb-5">
          Buka menu <strong>Akuntansi</strong> lalu pilih <strong>SP3B</strong>.
          Tabel akan menampilkan daftar SP3B dengan informasi nomor dokumen,
          tanggal, periode, dan saldo.
        </p>
        <p className="mb-5">
          Akses: <strong>Akuntansi</strong> &gt; <strong>SP3B</strong>
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Menambah SP3B</h3>
        <ol className="mb-5 list-inside list-decimal space-y-2">
          <li>Klik tombol <strong>Buat</strong> di pojok kanan atas.</li>
          <li>Isi nomor dokumen SP3B.</li>
          <li>Isi tanggal dokumen.</li>
          <li>Isi periode (tanggal mulai dan tanggal selesai).</li>
          <li>Isi saldo awal bendahara penerimaan.</li>
          <li>Klik <strong>Simpan</strong>.</li>
        </ol>

        <h3 className="mb-3 mt-8 text-xl font-bold">Detail SP3B</h3>
        <p className="mb-5">
          Klik tombol <strong>Lihat</strong> pada baris SP3B untuk melihat
          detail lengkap. Halaman detail menampilkan:
        </p>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li><strong>Periode:</strong> Rentang tanggal yang dicakup SP3B.</li>
          <li><strong>Saldo Bank Penerimaan:</strong> Saldo akhir rekening bank penerimaan dari rekening koran.</li>
          <li><strong>Saldo SP3B:</strong> Perhitungan saldo = Saldo Awal + Pendapatan - Belanja (Pegawai + Barjas + Modal).</li>
          <li><strong>Selisih Saldo:</strong> Selisih antara saldo bank dan saldo SP3B.</li>
          <li><strong>Saldo Bank Pengeluaran:</strong> Saldo akhir rekening bank pengeluaran.</li>
          <li><strong>Kas Bendahara Pengeluaran:</strong> Selisih antara saldo penerimaan dan pengeluaran.</li>
        </ul>

        <h3 className="mb-3 mt-8 text-xl font-bold">Cetak Dokumen</h3>
        <p className="mb-5">
          Di halaman detail SP3B, terdapat 4 dokumen cetak yang tersedia:
        </p>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li>
            <strong>Surat Pengantar:</strong> Surat pengantar pengiriman dokumen
            SP3B ke BPKAD.
          </li>
          <li>
            <strong>SPTJB Belanja:</strong> Surat Pernyataan Tanggung Jawab
            Belanja — pernyataan bahwa belanja sudah dilakukan sesuai ketentuan.
          </li>
          <li>
            <strong>SPTJB Pendapatan:</strong> Surat Pernyataan Tanggung Jawab
            Pendapatan — pernyataan bahwa pendapatan sudah diterima sesuai
            ketentuan.
          </li>
          <li>
            <strong>SP3B:</strong> Surat Pernyataan Tanggung Jawab Pemotongan
            dan Penyetoran Pajak — dokumen utama SP3B.
          </li>
        </ul>

        <h3 className="mb-3 mt-8 text-xl font-bold">Edit dan Hapus</h3>
        <p className="mb-5">
          Klik tombol <strong>Edit</strong> untuk mengubah data SP3B. Klik{" "}
          <strong>Hapus</strong> untuk menghapus SP3B (perlu konfirmasi).
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Filter dan Pencarian</h3>
        <p className="mb-5">
          Gunakan kolom pencarian untuk mencari SP3B berdasarkan nomor dokumen.
          Tabel mendukung pagination untuk navigasi data yang banyak.
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/panduan/sp3b/")({
  component: Page,
});
