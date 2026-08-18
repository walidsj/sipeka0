import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HiOutlineChevronDoubleDown, HiOutlinePrinter } from "react-icons/hi";
import { Link } from "react-router-dom";
import LraTable from "./table";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Laporan Realisasi Anggaran</CardTitle>
        <CardDescription>Data laporan realisasi anggaran</CardDescription>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Aksi <HiOutlineChevronDoubleDown className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <Link to="cetak">
                <DropdownMenuItem>
                  <HiOutlinePrinter className="mr-2" />
                  Cetak
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent>
        <LraTable />
      </CardContent>
    </Card>
  );
}
