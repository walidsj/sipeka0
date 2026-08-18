import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi";
import SppTable from "./table";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SPP Belanja</CardTitle>
        <CardDescription>
          Daftar SPP Belanja Bendahara Pengeluaran BLUD RSJD Atma Husada Mahakam
        </CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="tambah">
              <HiOutlinePlus />
              Tambah
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <SppTable />
      </CardContent>
    </Card>
  );
}
