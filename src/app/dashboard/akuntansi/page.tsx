import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HiOutlineArchive,
  HiOutlineArrowSmRight,
  HiOutlineDocumentReport,
  HiOutlineDocumentText,
  HiOutlineUpload,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-4 pb-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row gap-4">
          <div className="w-full">
            <CardTitle className="mb-3">Rekening Koran</CardTitle>
            <CardDescription>Mutasi Rekening Bank</CardDescription>
          </div>
          <HiOutlineArchive className="text-primary flex-shrink-0 flex-grow-0 text-5xl" />
        </CardHeader>
        <CardFooter className="gap-2">
          <Button asChild>
            <Link to="rekening-koran">
              Akses
              <HiOutlineArrowSmRight className="ml-2" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="rekening-koran/import">
              Import
              <HiOutlineUpload className="ml-2" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="flex flex-row gap-4">
          <div className="w-full">
            <CardTitle className="mb-3">SP3B</CardTitle>
            <CardDescription>
              Surat Perintah Pengesahan Pendapatan dan Belanja
            </CardDescription>
          </div>
          <HiOutlineDocumentText className="text-primary flex-shrink-0 flex-grow-0 text-5xl" />
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link to="sp3b">
              Akses
              <HiOutlineArrowSmRight className="ml-2" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="flex flex-row gap-4">
          <div className="w-full">
            <CardTitle className="mb-3">LRA</CardTitle>
            <CardDescription>Laporan Realisasi Anggaran</CardDescription>
          </div>
          <HiOutlineDocumentReport className="text-primary flex-shrink-0 flex-grow-0 text-5xl" />
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link to="lra">
              Akses
              <HiOutlineArrowSmRight className="ml-2" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
