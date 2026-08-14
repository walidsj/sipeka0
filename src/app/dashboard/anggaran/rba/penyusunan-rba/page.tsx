import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import RbaContentList from "./content";
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
        <CardTitle>Penyusunan RBA</CardTitle>
        <CardDescription>
          Dokumen perencanaan bisnis dan penganggaran tahunan
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
        <RbaContentList />
      </CardContent>
    </Card>
  );
}
