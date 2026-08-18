import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BelanjaTable from "./table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Perekaman Belanja</CardTitle>
        <CardDescription>Data perekaman belanja</CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="tambah">
              <FiPlus />
              Tambah
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <BelanjaTable />
      </CardContent>
    </Card>
  );
}
