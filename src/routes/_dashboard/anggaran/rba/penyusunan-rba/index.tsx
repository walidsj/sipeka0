import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { Link } from "@tanstack/react-router";
import RbaContentList from "@/features/anggaran/rba/penyusunan-rba/content";
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
        <CardTitle>Penyusunan RBA</CardTitle>
        <CardDescription>
          Dokumen perencanaan bisnis dan penganggaran tahunan
        </CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="/anggaran/rba/penyusunan-rba/tambah">
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

export const Route = createFileRoute(
  "/_dashboard/anggaran/rba/penyusunan-rba/",
)({
  component: Page,
});
