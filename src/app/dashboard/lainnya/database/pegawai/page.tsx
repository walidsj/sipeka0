import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import PegawaiTable from "./table";

export default function Pegawai() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Pegawai</CardTitle>
        <CardDescription>
          Daftar pegawai yang terdaftar di BLUD
        </CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="tambah">
              <FiPlus className="mr-2" />
              Tambah
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <PegawaiTable />
      </CardContent>
    </Card>
  );
}
