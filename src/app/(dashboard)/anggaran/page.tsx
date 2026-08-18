import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-4 pb-5 sm:grid-cols-2 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Rencana Bisnis dan Anggaran</CardTitle>
          <CardDescription>
            Dokumen perencanaan bisnis dan penganggaran tahunan
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link to="rba/daftar-rab">
              Akses
              <HiOutlineArrowSmRight />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Dokumen Bisnis dan Anggaran</CardTitle>
          <CardDescription>
            Rencana bisnis dan anggaran BLUD yang telah disahkan dan ditetapkan
            untuk dilaksanakan
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link to="dba/penetapan">
              Akses
              <HiOutlineArrowSmRight />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Monitoring</CardTitle>
          <CardDescription>
            Menu untuk melakukan monitoring anggaran dan realisasi
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link to="monitoring/realisasi-belanja">
              Akses
              <HiOutlineArrowSmRight />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
