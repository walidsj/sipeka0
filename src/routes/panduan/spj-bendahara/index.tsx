import { createFileRoute } from "@tanstack/react-router";

function Page() {
  return (
    <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-3xl font-extrabold">SPJ Bendahara</h2>
      <div className="py-8 text-justify">
        <p className="mb-5">
          Surat Pertanggungjawaban Bendahara Pengeluaran (SPJ Bendahara) adalah laporan
          yang menunjukkan realisasi belanja berdasarkan jenis pembayaran: LS Pegawai,
          LS Barang dan Jasa, LS Modal, serta UP/GU/TU. Laporan ini digunakan untuk
          pertanggungjawaban Bendahara Pengeluaran kepada Kuasa Pengguna Anggaran.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Mengakses SPJ Bendahara</h3>
        <p className="mb-5">
          Buka menu <strong>Belanja</strong> &gt; <strong>LPJ</strong>, lalu buka detail
          LPJ yang ingin dilihat SPJ-nya. Klik tombol <strong>Aksi</strong> lalu pilih{" "}
          <strong>Cetak SPJ Bendahara</strong>.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Filter Periode</h3>
        <p className="mb-5">
          Gunakan <strong>MonthFilter</strong> untuk memilih periode laporan. Default
          periode adalah dari awal tahun hingga akhir tahun. Data SPJ akan menampilkan:
        </p>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li>
            <strong>s.d Bulan Lalu:</strong> Realisasi dari awal tahun hingga hari
            sebelum tanggal awal filter.
          </li>
          <li>
            <strong>Bulan Ini:</strong> Realisasi pada periode filter yang dipilih.
          </li>
          <li>
            <strong>s.d Bulan Ini:</strong> Realisasi dari awal tahun hingga tanggal
            akhir filter.
          </li>
        </ul>

        <h3 className="mb-3 mt-8 text-xl font-bold">Memahami Kolom</h3>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li>
            <strong>SPJ - LS Pegawai:</strong> Belanja langsung untuk komponen pegawai
            (kode rekening berawalan 5.1.01).
          </li>
          <li>
            <strong>SPJ - LS Barang dan Jasa:</strong> Belanja langsung untuk barang
            dan jasa (kode rekening berawalan 5.1.02).
          </li>
          <li>
            <strong>SPJ - LS Modal:</strong> Belanja langsung untuk modal (kode rekening
            berawalan 5.2).
          </li>
          <li>
            <strong>SPJ - UP/GU/TU:</strong> Uang Persediaan, Ganti Uang Persediaan,
            dan Tambah Uang Persediaan (LPJ jenis GU atau TU).
          </li>
          <li>
            <strong>Jumlah SPJ:</strong> Total seluruh realisasi (LS Pegawai + LS Barang
            dan Jasa + LS Modal + UP/GU/TU).
          </li>
          <li>
            <strong>Sisa Anggaran:</strong> Anggaran - Jumlah SPJ. Jika minus (merah),
            berarti realisasi melebihi anggaran.
          </li>
        </ul>

        <h3 className="mb-3 mt-8 text-xl font-bold">Mencetak</h3>
        <p className="mb-5">
          Klik tombol <strong>Cetak</strong> di bagian atas untuk mencetak atau menyimpan
          sebagai PDF. Hasil cetak sudah termasuk kop surat resmi RSJD Atma Husada
          Mahakam dan tanda tangan Kuasa Pengguna Anggaran.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-bold">Kode Warna</h3>
        <ul className="mb-5 list-inside list-disc space-y-2">
          <li>
            <span className="text-red-500 font-semibold">Teks merah:</span> Sisa anggaran
            minus (realisasi melebihi anggaran).
          </li>
        </ul>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/panduan/spj-bendahara/")({
  component: Page,
});
