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
import PengelolaBludTable from "./table";

export default function PengelolaBlud() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Penetapan Pengelola BLUD</CardTitle>
        <CardDescription>
          Daftar pegawai yang berperan sebagai pengelola BLUD
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
        <PengelolaBludTable />
      </CardContent>
    </Card>
  );
}
