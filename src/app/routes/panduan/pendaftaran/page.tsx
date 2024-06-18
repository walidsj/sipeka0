export default function () {
    return (
        <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
            <h2 className="text-3xl font-extrabold">Pendaftaran Akun</h2>
            <div className="py-8 text-justify">
                <p className="mb-5">
                    Pendaftaran akun SIPEKA dapat dilakukan secara mandiri oleh
                    pengguna. Berikut adalah langkah-langkah pendaftaran akun
                    SIPEKA:
                </p>
                <h3 className="mb-2 text-xl font-semibold">Langkah-langkah</h3>
                <ol className="mb-5 list-outside list-decimal pl-5">
                    <li>
                        Buka aplikasi SIPEKA melalui browser yang tersedia di
                        perangkat pengguna.
                    </li>
                    <li>
                        Pada halaman utama Aplikasi SIPEKA, klik tombol{' '}
                        <strong>Daftar</strong> yang terletak di bagian kanan
                        atas halaman.
                    </li>
                    <li>
                        Pengguna akan diarahkan ke halaman pendaftaran akun
                        SIPEKA. Isi data yang diperlukan pada formulir
                        pendaftaran akun SIPEKA.
                    </li>
                    <li>
                        Lalu masukkan TokenID yang telah diberikan oleh Admin
                        SIPEKA. Jika belum memiliki TokenID, silahkan hubungi
                        Admin.
                    </li>
                    <li>
                        Klik tombol <strong>Daftar Akun</strong> untuk
                        menyelesaikan proses pendaftaran akun SIPEKA.
                    </li>
                    <li>
                        Setelah berhasil mendaftar, pengguna akan diarahkan ke
                        halaman login SIPEKA.
                    </li>
                </ol>
                <p className="mb-5">
                    <img
                        src="/images/panduan/register-page.png"
                        alt="Halaman Register"
                        className="mx-auto mb-2 max-w-3xl rounded-xl border"
                    />
                    <small className="block text-center italic text-gray-500">
                        Register akun di SIPEKA
                    </small>
                </p>
            </div>
        </div>
    )
}
