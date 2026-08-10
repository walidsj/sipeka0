import { Button } from "@/components/ui/button";
import { FiChevronLeft, FiHome } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center pt-28">
      <img src="/images/icons/404-error.png" alt="404" className="mb-5 w-36" />
      <h1 className="text-center text-4xl font-bold">We&apos;re Sorry</h1>
      <p className="mb-5 text-center text-lg">
        Halaman yang Anda cari tidak ditemukan
      </p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <FiChevronLeft className="mr-2" />
          Halaman Sebelumnya
        </Button>
        <Button asChild>
          <Link to="/dashboard">
            <FiHome className="mr-2" />
            Kembali ke Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
