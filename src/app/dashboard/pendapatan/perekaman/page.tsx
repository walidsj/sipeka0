import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PendapatanTable from "./table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

export default function CreatePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Perekaman Pendapatan</CardTitle>
        <CardDescription>Data perekaman pendapatan</CardDescription>
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
        <PendapatanTable />
      </CardContent>
    </Card>
  );
}
