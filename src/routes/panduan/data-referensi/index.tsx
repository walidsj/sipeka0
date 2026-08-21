import { createFileRoute } from "@tanstack/react-router";

function Page() {
  return (
    <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-3xl font-extrabold">Data Referensi</h2>
      <div className="py-8 text-justify">
        <p className="mb-5">
          Data Referensi adalah data pendukung yang digunakan di seluruh modul
          SIPEKA. Data ini harus diinput dan dikelola dengan benar agar proses
          pencatatan keuangan berjalan lancar.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Jenis Data Referensi</h3>

        <h4 className="mb-2 mt-5 text-lg font-semibold">Rekanan</h4>
        <p className="mb-5">
          Data mitra/distributor yang menjadi penerima pembayaran belanja barang
          dan jasa. Setiap rekanan memiliki nama, NPWP, alamat, dan informasi
          rekening bank untuk pembayaran transfer.
        </p>
        <p className="mb-5">
          Akses: <strong>Lainnya</strong> &gt; <strong>Database</strong> &gt;{" "}
          <strong>Rekanan</strong>
        </p>

        <h4 className="mb-2 mt-5 text-lg font-semibold">Pegawai</h4>
        <p className="mb-5">
          Data pegawai RSJD Atma Husada Mahakam yang menjadi penerima belanja
          terkait tunjangan, gaji, atau komponen pegawai lainnya. Data pegawai
          mencakup nama, gelar, NIP, NPWP, dan informasi rekening bank.
        </p>
        <p className="mb-5">
          Akses: <strong>Lainnya</strong> &gt; <strong>Database</strong> &gt;{" "}
          <strong>Pegawai</strong>
        </p>

        <h4 className="mb-2 mt-5 text-lg font-semibold">Bank</h4>
        <p className="mb-5">
          Data bank yang digunakan untuk pembayaran transfer. Setiap bank memiliki
          nama, kode, dan jenis (Konvensional/Syariah). Bank tertentu (kode 124)
          ditandai sebagai bank khusus BLUD.
        </p>
        <p className="mb-5">
          Akses: <strong>Lainnya</strong> &gt; <strong>Database</strong> &gt;{" "}
          <strong>Bank</strong>
        </p>

        <h4 className="mb-2 mt-5 text-lg font-semibold">Unit Kerja</h4>
        <p className="mb-5">
          Data unit kerja di lingkungan RSJD Atma Husada Mahakam. Unit kerja
          terkait dengan RAB (Rencana Anggaran Belanja) sebagai penanggung
          jawab anggaran.
        </p>
        <p className="mb-5">
          Akses: <strong>Lainnya</strong> &gt; <strong>Database</strong> &gt;{" "}
          <strong>Unit Kerja</strong>
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Menambah Data</h3>
        <ol className="mb-5 list-inside list-decimal space-y-2">
          <li>Buka halaman data referensi yang diinginkan.</li>
          <li>Klik tombol <strong>Tambah</strong>.</li>
          <li>Isi seluruh kolom yang diperlukan.</li>
          <li>Klik <strong>Simpan</strong>.</li>
        </ol>

        <h3 className="mb-3 mt-8 text-xl font-bold">Mengubah Data</h3>
        <ol className="mb-5 list-inside list-decimal space-y-2">
          <li>Cari data yang ingin diubah menggunakan kolom pencarian.</li>
          <li>Klik tombol <strong>Aksi</strong> pada baris data.</li>
          <li>Pilih <strong>Edit</strong>.</li>
          <li>Ubah kolom yang diperlukan.</li>
          <li>Klik <strong>Simpan</strong>.</li>
        </ol>

        <h3 className="mb-3 mt-8 text-xl font-bold">Menghapus Data</h3>
        <p className="mb-5">
          Klik tombol <strong>Aksi</strong> lalu pilih <strong>Hapus</strong>.
          Konfirmasi akan muncul sebelum data benar-benar dihapus. Data yang
          sudah terkait dengan transaksi tidak bisa dihapus.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Pencarian</h3>
        <p className="mb-5">
          Semua halaman data referensi memiliki kolom pencarian yang bisa digunakan
          untuk mencari data berdasarkan nama atau nomor dokumen.
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/panduan/data-referensi/")({
  component: Page,
});
