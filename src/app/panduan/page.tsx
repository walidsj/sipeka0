export default function Page() {
    return (
        <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
            <h2 className="text-3xl font-extrabold">Pendahuluan</h2>
            <div className="py-8 text-justify">
                <iframe
                    className="mx-auto mb-5 aspect-video w-full rounded-xl border"
                    src="https://www.youtube.com/embed/XPIGNGomekQ?si=Ep4dNeHerzEGXvEj?enablejsapi=1&origin=https://sipeka.atmaku.com"
                ></iframe>
                <p className="mb-5">
                    Rumah Sakit Jiwa Daerah Atma Husada Mahakam adalah salah
                    satu organisasi perangkat daerah Pemerintah Provinsi
                    Kalimantan Timur yang menyelenggarakan tugas dan fungsi
                    pelayanan Kesehatan, yang berupaya untuk selalu memberikan
                    pelayanan yang terbaik dan bermutu kepada seluruh masyarakat
                    melalui peningkatan keterampilan SDM, peningkatan
                    pemanfaatan teknologi, perbaikan sarana dan prasarana serta
                    peningkatan keamanan dan kenyamanan pasien. Hal ini tentu
                    dibutuhkan biaya yang cukup besar baik biaya operasional
                    maupun investasi, sehingga memerlukan pengelolaan yang
                    sesuai dengan prinsip good governance dan clean goverment
                    yaitu profesional, akuntabilitas, transparansi, efisiensi,
                    efektifitas, demokrasi, pelayanan prima dan supremasi hukum.
                </p>
                <p className="mb-5">
                    Pemerintah melalui Kementerian Dalam Negeri telah
                    menginisiasi aplikasi berbasis Web sebuah sistem yang
                    diharapkan dapat menjadi instrument pengelolaan keuangan
                    yang diberi nama Sistem Informasi Pemerintah Daerah (SIPD)
                    yang terdiri dari Sistem Informasi Pembangunan Daerah dan
                    Sistem Informasi Keuangan Daerah. Sistem informasi tersebut
                    mengintegrasikan semua tahapan pengelolaan keuangan daerah
                    dari perencanaan, penganggaran, pelaksanaan, dan pelaporan
                    keuangan.
                </p>
                <p className="mb-5">
                    Hingga saat ini aplikasi Sistem Informasi Pemerintah Daerah
                    (SIPD) Kementerian Dalam Negeri telah berkembang dengan
                    versi terakhir yaitu SIPD RI, yang diwajibkan penggunaannya
                    untuk seluruh pemerintah daerah di Indonesia mulai Tahun
                    Anggaran (TA) 2024. Pemerintah Provinsi Kaltim tahun 2023
                    dalam pengelolaan keuangan telah mengimplementasikan
                    aplikasi SIPD, namun masih terdapat kendala dalam
                    pelaksanaannya baik dari sistem, sarana dan prasarana hingga
                    kompetensi SDM.
                </p>
                <p className="mb-5">
                    Selanjutnya sebagaimana diamanatkan, pada tahun 2024 seluruh
                    organisasi perangkat daerah di lingkungan Pemprov Kaltim
                    harus menggunakan aplikasi pengembangan SIPD yaitu SIPD RI.
                    Kondisi tersebut tentunya membawa dampak perubahan dan
                    masalah yang sangat signifikan untuk unit organisasi
                    termasuk rumah sakit daerah, yang sejak tahun 2024 telah
                    berubah status menjadi Unit Organisasi Bersifat Khusus
                    (UOBK) sebagaimana diamanatkan dalam Peraturan Gubernur
                    Kaltim Nomor 22 Tahun 2023 tentang Pembentukan, Kedudukan,
                    Susunan Organisasi, Tugas, Fungsi, Uraian Tugas dan Tata
                    Kerja Rumah Sakit Daerah pada Dinas Kesehatan.
                </p>
                <p className="mb-5">
                    Dalam implementasi SIPD RI rumah sakit selain terdampak
                    karena perubahan status menjadi UOBK yang menyebabkan
                    peralihan dan penggabungan anggaran pada Dinas Kesehatan
                    Provinsi, juga terkendala dengan tidak tersedianya fitur
                    BLUD pada aplikasi SIPD RI. Sedangkan dalam pengelolaan
                    keuangan BLUD rumah sakit diwajibkan untuk melaporkan
                    perkembangan anggaran per tiga bulan (triwulan) kepada BPKAD
                    Provinsi Kaltim, sehingga untuk pemenuhannya saat ini
                    dilakukan secara manual. Proses tersebut tentunya tidak
                    efektif dan efesien karena selain proses yang lama juga
                    memiliki risiko terjadinya kekeliruan baik oleh operator
                    data maupun verifikator.
                </p>
                <p className="mb-5">
                    Dengan kondisi sebagaimana dijelaskan diatas, maka dipandang
                    perlu adanya alternatif penggunaan sistem aplikasi di luar
                    SIPD RI untuk mendukung tahap pelaksanaan, penatausahaan
                    serta pelaporan atas pelaksanaan anggaran BLUD RSJD Atma
                    Husada Mahakam. Untuk itu dalam rangka memenuhi tugas
                    Pendidikan Kepemimpinan Administrastor (PKA) diajukan usulan
                    aplikasi yang diberi nama SIPEKA (Sistem informasi
                    Pengelolaan Keuangan) yang dibangun dalam rangka percepatan
                    pelaporan keuangan BLUD di RSJD Atma Husada Mahakam.
                </p>
            </div>
        </div>
    )
}
