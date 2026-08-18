import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import Sp3bTable from "./table";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar SP3B</CardTitle>
        <CardDescription>
          Data surat perintah pengesahan pendapatan dan belanja (SP3B)
        </CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="tambah">
              <FiPlus className="mr-2" />
              Buat
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Sp3bTable />
      </CardContent>
    </Card>
  );
}
