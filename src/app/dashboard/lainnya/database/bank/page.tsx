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
import BankTable from "./table";

export default function Bank() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Bank</CardTitle>
        <CardDescription>
          Daftar referensi bank untuk transaksi BLUD
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
        <BankTable />
      </CardContent>
    </Card>
  );
}
