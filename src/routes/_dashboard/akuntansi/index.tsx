import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HiOutlineArrowSmRight, HiOutlineUpload } from "react-icons/hi";
import { Link } from "@tanstack/react-router";

function Page() {
  return (
    <div className="grid grid-cols-1 gap-4 pb-5 sm:grid-cols-2 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Rekening Koran</CardTitle>
          <CardDescription>Mutasi Rekening Bank</CardDescription>
        </CardHeader>
        <CardFooter className="gap-2">
          <Button asChild>
            <Link to="/akuntansi/rekening-koran">
              Akses
              <HiOutlineArrowSmRight />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/akuntansi/rekening-koran/import">
              Import
              <HiOutlineUpload />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>SP3B</CardTitle>
          <CardDescription>
            Surat Perintah Pengesahan Pendapatan dan Belanja
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link to="/akuntansi/sp3b">
              Akses
              <HiOutlineArrowSmRight />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>LRA</CardTitle>
          <CardDescription>Laporan Realisasi Anggaran</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link to="/akuntansi/lra">
              Akses
              <HiOutlineArrowSmRight />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export const Route = createFileRoute("/_dashboard/akuntansi/")({
  component: Page,
});
