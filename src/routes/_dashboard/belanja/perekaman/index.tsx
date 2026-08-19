import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BelanjaTable from "@/features/belanja/perekaman/table";
import { TableBoundary } from "@/components/table-boundary";

import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { FiPlus } from "react-icons/fi";

function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Perekaman Belanja</CardTitle>
        <CardDescription>Data perekaman belanja</CardDescription>
        <CardAction>
          <Button asChild>
            <Link to="/belanja/perekaman/tambah">
              <FiPlus />
              Tambah
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <TableBoundary>
          <BelanjaTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/belanja/perekaman/")({
  component: Page,
});
