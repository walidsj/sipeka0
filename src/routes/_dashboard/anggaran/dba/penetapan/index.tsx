import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { Link } from "@tanstack/react-router";
import RkaContentList from "@/features/anggaran/dba/penetapan/content";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Page() {
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
            <Link to="/anggaran/dba/penetapan/tambah">
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

export const Route = createFileRoute("/_dashboard/anggaran/dba/penetapan/")({
  component: Page,
});
