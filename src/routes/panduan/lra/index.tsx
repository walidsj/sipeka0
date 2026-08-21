import { createFileRoute } from "@tanstack/react-router";

function Page() {
  return (
    <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-3xl font-extrabold">Laporan Realisasi Anggaran</h2>
      <div className="py-8 text-justify">
        <p className="mb-5">
          Laporan Realisasi Anggaran (LRA) adalah laporan yang menunjukkan perbandingan
          antara anggaran yang telah ditetapkan dengan realisasi pendapatan, belanja,
          dan pembiayaan selama periode tertentu. LRA merupakan salah satu laporan
          keuangan utama dalam pengelolaan BLUD.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Mengakses LRA</h3>
        <p className="mb-5">
          Untuk mengakses halaman LRA, buka menu <strong>Akuntansi</strong> lalu pilih{" "}
          <strong>LRA</strong>. Tabel akan menampilkan data rekening dengan kolom kode
          rekening, uraian, anggaran, realisasi, dan sisa anggaran.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Filter Periode</h3>
        <p className="mb-5">
          Gunakan <strong>MonthFilter</strong> di bagian atas untuk memilih periode laporan.
          Default periode adalah dari awal tahun (1 Januari) hingga akhir tahun (31 Desember).
        </p>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li>
            <strong>Awal tahun (startDate = 01-01):</strong> Hanya menampilkan kolom{" "}
            <em>Realisasi</em> saja (total dari seluruh periode).
          </li>
          <li>
            <strong>Bukan awal tahun:</strong> Menampilkan kolom <em>Realisasi Periode Sebelumnya</em>,{" "}
            <em>Realisasi Periode Ini</em>, dan <em>Jumlah Realisasi</em>.
          </li>
        </ul>

        <h3 className="mb-3 mt-8 text-xl font-bold">Memahami Kolom</h3>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li>
            <strong>Anggaran:</strong> Total anggaran yang dialokasikan untuk masing-masing
            kode rekening (dari RBA/DBA).
          </li>
          <li>
            <strong>Realisasi Periode Sebelumnya:</strong> Jumlah belanja yang sudah
            tercatat sebelum periode filter dimulai.
          </li>
          <li>
            <strong>Realisasi Periode Ini:</strong> Jumlah belanja pada periode yang
            sedang difilter.
          </li>
          <li>
            <strong>Jumlah Realisasi:</strong> Total realisasi = Sebelumnya + Periode Ini.
          </li>
          <li>
            <strong>Sisa Anggaran:</strong> Anggaran - Jumlah Realisasi. Jika minus
            (merah), berarti realisasi sudah melebihi anggaran.
          </li>
        </ul>

        <h3 className="mb-3 mt-8 text-xl font-bold">Mencetak LRA</h3>
        <p className="mb-5">
          Klik tombol <strong>Aksi</strong> di tabel LRA lalu pilih <strong>Cetak</strong> untuk
          membuka halaman cetak LRA. Di halaman cetak, Anda bisa mengubah tanggal akhir
          (tanggal awal selalu 1 Januari) lalu klik <strong>Cetak</strong> untuk mencetak
          atau menyimpan sebagai PDF.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Melihat Detail</h3>
        <p className="mb-5">
          Klik tombol <strong>Aksi</strong> lalu pilih <strong>Detail</strong> untuk melihat
          rincian belanja pada kode rekening tertentu. Halaman detail menampilkan daftar
          belanja yang terkait dengan kode rekening tersebut.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Kode Warna</h3>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li>
            <span className="text-red-500 font-semibold">Teks merah:</span> Realisasi
            melebihi anggaran (overbudget).
          </li>
        </ul>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/panduan/lra/")({
  component: Page,
});
