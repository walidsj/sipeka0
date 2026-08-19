import { createFileRoute } from "@tanstack/react-router";

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
import { Link } from "@tanstack/react-router";
import UserTable from "@/features/lainnya/user/table";
import { TableBoundary } from "@/components/table-boundary";

import { useAuth } from "@/lib/auth";

function Page() {
  const auth = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar User</CardTitle>
        <CardDescription>Daftar user yang terdaftar di sistem</CardDescription>
        {auth.user?.role === "ADMIN" && (
          <CardAction>
            <Button asChild>
              <Link to="/lainnya/user/tambah">
                <FiPlus className="mr-2" />
                Tambah
              </Link>
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        <TableBoundary>
          <UserTable />
        </TableBoundary>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/_dashboard/lainnya/user/")({
  component: Page,
});
