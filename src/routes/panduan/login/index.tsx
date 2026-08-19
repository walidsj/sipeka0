import { createFileRoute } from "@tanstack/react-router";

function Page() {
  return (
    <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-3xl font-extrabold">Akses Masuk</h2>
      <div className="py-8 text-justify">
        <p className="mb-5">
          Sebelum dapat menggunakan Aplikasi SIPEKA, pengguna harus melakukan
          akses masuk terlebih dahulu. Berikut adalah langkah untuk melakukan
          akses masuk ke dalam Aplikasi SIPEKA:
        </p>
        <h3 className="mb-2 text-xl font-semibold">Langkah-langkah</h3>
        <ol className="mb-5 list-outside list-decimal pl-5">
          <li className="mb-2">
            Buka Aplikasi SIPEKA pada perangkat komputer atau smartphone
          </li>
          <li className="mb-2">
            Pilih menu <strong>Login</strong> di pojok kanan atas pada menu
            header
          </li>
          <li className="mb-2">
            Isi kolom <strong>Username</strong> dan <strong>Password</strong>{" "}
            dengan benar
          </li>
          <li className="mb-2">
            Masukkan username dan password yang telah diberikan oleh pihak RSJD
            Atma Husada Mahakam/yang telah terdaftar secara mandiri
          </li>
          <li className="mb-2">
            Klik tombol <strong>Masuk ke Sistem</strong> untuk melanjutkan
            proses akses masuk
          </li>
        </ol>
        <p className="mb-5">
          <img
            src="/images/panduan/login-page.png"
            alt="Halaman Login"
            className="mx-auto mb-2 max-w-3xl rounded-xl"
          />
          <small className="block text-center text-gray-500 italic">
            Login SIPEKA
          </small>
        </p>
        <p className="mb-5">
          Setelah berhasil melakukan akses masuk, pengguna akan diarahkan ke
          halaman utama Aplikasi SIPEKA. Berikut adalah tampilan halaman utama
          Aplikasi SIPEKA:
        </p>
        <p className="mb-5">
          <img
            src="/images/panduan/dashboard-page.png"
            alt="Halaman Dashboard"
            className="mx-auto mb-2 max-w-3xl rounded-xl"
          />
          <small className="block text-center text-gray-500 italic">
            Halaman Dashboard
          </small>
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/panduan/login/")({
  component: Page,
});
