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
import UserTable from "./table";
import { useAuth } from "@/lib/auth";

export default function Page() {
  const auth = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar User</CardTitle>
        <CardDescription>
          Daftar user yang terdaftar di sistem
        </CardDescription>
        {auth.user?.role === "ADMIN" && (
          <CardAction>
            <Button asChild>
              <Link to="tambah">
                <FiPlus className="mr-2" />
                Tambah
              </Link>
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        <UserTable />
      </CardContent>
    </Card>
  );
}
