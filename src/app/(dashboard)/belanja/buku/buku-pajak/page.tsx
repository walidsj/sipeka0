import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BkPajakTable from "./table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HiOutlineChevronDoubleDown, HiOutlinePrinter } from "react-icons/hi";
import { Link, useSearchParams } from "react-router-dom";

export default function Page() {
  const [searchParams] = useSearchParams();
  const search = searchParams.toString();
  const searchQuery = search ? `?${search}` : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buku Pembantu Pajak</CardTitle>
        <CardDescription>
          Daftar penerimaan dan penyetoran pajak yang telah dibuat
        </CardDescription>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Aksi <HiOutlineChevronDoubleDown className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <Link to={`cetak${searchQuery}`}>
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
        <BkPajakTable />
      </CardContent>
    </Card>
  );
}
