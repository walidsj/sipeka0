import { createFileRoute } from "@tanstack/react-router";

function Page() {
  return (
    <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-3xl font-extrabold">Pengenalan Aplikasi</h2>
      <div className="py-8 text-justify">
        <p className="mb-5">
          SIPEKA (Sistem Informasi Pengelolaan Keuangan) adalah sebuah aplikasi
          yang dibuat untuk memfasilitasi kegiatan pengelolaan keuangan BLUD
          pada RSJD Atma Husada Mahakam yang digunakan oleh pejabat pengelola
          keuangan dan stakeholder terkait. Aplikasi ini dibuat dalam rangka
          percepatan pelaporan keuangan BLUD, yang menyajikan data terdiri dari
          pendapatan, belanja dan pembiayaan BLUD.
        </p>
        <p className="mb-5">
          <img
            src="/images/panduan/preview-sipeka.png"
            alt="SIPEKA"
            className="mx-auto mb-2 max-w-3xl rounded-xl"
          />
          <small className="block text-center text-gray-500 italic">
            Tampilan Depan SIPEKA
          </small>
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/panduan/pengenalan/")({
  component: Page,
});
