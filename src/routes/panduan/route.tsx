import { createFileRoute } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet";
import { FaHeart } from "react-icons/fa6";
import { FiArrowRight, FiHome } from "react-icons/fi";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-row gap-5 py-8">
      <Helmet>
        <title>Panduan - Atmaku</title>
      </Helmet>
      <div className="w-72 shrink-0 px-5 md:pl-8 lg:pl-10 xl:pl-12">
        <div className="flex flex-col gap-3 font-semibold">
          <Link to="/" className="flex h-20 flex-shrink-0 items-center gap-4">
            <img
              src="/images/logo-sipeka-full-long.svg"
              alt="Logo Atmaku"
              className={cn("block h-9")}
            />
          </Link>
          <h2 className="text-xl font-extrabold">Dasar</h2>
          <Link
            to="/panduan"
            className={cn(
              "flex items-center justify-between",
              pathname === "/panduan" && "text-primary",
            )}
          >
            Pendahuluan
            {pathname === "/panduan" && <FiArrowRight />}
          </Link>
          <Link
            to="/panduan/pengenalan"
            className={cn(
              "flex items-center justify-between",
              pathname === "/panduan/pengenalan" && "text-primary",
            )}
          >
            Pengenalan Aplikasi
            {pathname === "/panduan/pengenalan" && <FiArrowRight />}
          </Link>
          <Link
            to="/panduan/tech-stack"
            className={cn(
              "flex items-center justify-between",
              pathname === "/panduan/tech-stack" && "text-primary",
            )}
          >
            Tech Stack
            {pathname === "/panduan/tech-stack" && <FiArrowRight />}
          </Link>
          <Link
            to="/panduan/login"
            className={cn(
              "flex items-center justify-between",
              pathname === "/panduan/login" && "text-primary",
            )}
          >
            Akses Masuk
            {pathname === "/panduan/login" && <FiArrowRight />}
          </Link>
          <Link
            to="/panduan/pendaftaran"
            className={cn(
              "flex items-center justify-between",
              pathname === "/panduan/pendaftaran" && "text-primary",
            )}
          >
            Pendaftaran Akun
            {pathname === "/panduan/pendaftaran" && <FiArrowRight />}
          </Link>
          <h2 className="mt-4 text-xl font-extrabold">Modul</h2>
          <Link
            to="/panduan/anggaran"
            className={cn(
              "flex items-center justify-between",
              pathname === "/panduan/anggaran" && "text-primary",
            )}
          >
            Anggaran
            {pathname === "/panduan/anggaran" && <FiArrowRight />}
          </Link>
          <Link
            to="/panduan/rba"
            className={cn(
              "flex items-center justify-between",
              pathname === "/panduan/rba" && "text-primary",
            )}
          >
            Penyusunan RBA
            {pathname === "/panduan/rba" && <FiArrowRight />}
          </Link>
          <Link
            to="/panduan/rekam-belanja"
            className={cn(
              "flex items-center justify-between",
              pathname === "/panduan/rekam-belanja" && "text-primary",
            )}
          >
            Rekam Belanja
            {pathname === "/panduan/rekam-belanja" && <FiArrowRight />}
          </Link>
          <Link
            to="/panduan/pendapatan"
            className={cn(
              "flex items-center justify-between",
              pathname === "/panduan/pendapatan" && "text-primary",
            )}
          >
            Pendapatan
            {pathname === "/panduan/pendapatan" && <FiArrowRight />}
          </Link>
          <Link
            to="/panduan/lpj"
            className={cn(
              "flex items-center justify-between",
              pathname === "/panduan/lpj" && "text-primary",
            )}
          >
            LPJ Belanja
            {pathname === "/panduan/lpj" && <FiArrowRight />}
          </Link>
          <Link
            to="/panduan/spp"
            className={cn(
              "flex items-center justify-between",
              pathname === "/panduan/spp" && "text-primary",
            )}
          >
            SPP
            {pathname === "/panduan/spp" && <FiArrowRight />}
          </Link>
          <Link
            to="/panduan/spm"
            className={cn(
              "flex items-center justify-between",
              pathname === "/panduan/spm" && "text-primary",
            )}
          >
            SPM
            {pathname === "/panduan/spm" && <FiArrowRight />}
          </Link>
          <Link
            to="/panduan/sp2d"
            className={cn(
              "flex items-center justify-between",
              pathname === "/panduan/sp2d" && "text-primary",
            )}
          >
            SP2D
            {pathname === "/panduan/sp2d" && <FiArrowRight />}
          </Link>
          <Link
            to="/panduan/lra"
            className={cn(
              "flex items-center justify-between",
              pathname === "/panduan/lra" && "text-primary",
            )}
          >
            LRA
            {pathname === "/panduan/lra" && <FiArrowRight />}
          </Link>
          <Link
            to="/panduan/spj-bendahara"
            className={cn(
              "flex items-center justify-between",
              pathname === "/panduan/spj-bendahara" && "text-primary",
            )}
          >
            SPJ Bendahara
            {pathname === "/panduan/spj-bendahara" && <FiArrowRight />}
          </Link>
          <Link
            to="/panduan/akuntansi"
            className={cn(
              "flex items-center justify-between",
              pathname === "/panduan/akuntansi" && "text-primary",
            )}
          >
            Akuntansi
            {pathname === "/panduan/akuntansi" && <FiArrowRight />}
          </Link>
          <Link
            to="/panduan/sp3b"
            className={cn(
              "flex items-center justify-between",
              pathname === "/panduan/sp3b" && "text-primary",
            )}
          >
            SP3B
            {pathname === "/panduan/sp3b" && <FiArrowRight />}
          </Link>
          <Link
            to="/panduan/data-referensi"
            className={cn(
              "flex items-center justify-between",
              pathname === "/panduan/data-referensi" && "text-primary",
            )}
          >
            Data Referensi
            {pathname === "/panduan/data-referensi" && <FiArrowRight />}
          </Link>
          <h2 className="mt-4 text-xl font-extrabold">Lainnya</h2>
          <Link
            to="/panduan/faq"
            className={cn(
              "flex items-center justify-between",
              pathname === "/panduan/faq" && "text-primary",
            )}
          >
            FAQ
            {pathname === "/panduan/faq" && <FiArrowRight />}
          </Link>
          <Button
            className="mt-10"
            nativeButton={false}
            render={<Link to="/" />}
          >
            <FiHome />
            Kembali ke Beranda
          </Button>
        </div>
      </div>
      <div className="w-full">
        <Outlet />
        <footer className="flex w-96 flex-col gap-5 px-5 text-xs text-slate-500 md:pr-8 lg:pr-10 xl:pr-12">
          <p>&copy;{new Date().getFullYear()} RSJD Atma Husada Mahakam</p>
          <p>
            Build with <FaHeart className="inline-block h-5 w-5 text-red-500" />
          </p>
        </footer>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/panduan")({
  component: Layout,
});
