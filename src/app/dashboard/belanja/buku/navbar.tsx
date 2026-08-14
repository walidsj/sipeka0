import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HiOutlineBookOpen } from "react-icons/hi";
import { Card, CardContent } from "@/components/ui/card";

export default function Navbar() {
  return (
    <Card>
      <CardContent>
        <Button variant="ghost" asChild>
          <Link to="kas-umum">
            <HiOutlineBookOpen />
            Buku Kas Umum
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="buku-pajak">
            <HiOutlineBookOpen />
            Buku Pajak
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
