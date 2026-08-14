import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import RkaContentList from "./content";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dokumen Bisnis dan Anggaran</CardTitle>
        <CardDescription>
          Rencana bisnis dan anggaran BLUD yang telah disahkan dan ditetapkan
          untuk dilaksanakan
        </CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="tambah">
              <FiPlus />
              Buat Dokumen
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <RkaContentList />
      </CardContent>
    </Card>
  );
}
