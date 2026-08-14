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
import LpjBelanjaTable from "./table";
import { HiOutlinePlus } from "react-icons/hi";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>LPJ Belanja</CardTitle>
        <CardDescription>
          Daftar LPJ Belanja Bendahara Pengeluaran BLUD RSJD Atma Husada Mahakam
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
        <LpjBelanjaTable />
      </CardContent>
    </Card>
  );
}
