import { Button } from "@/components/ui/button";
import { HiOutlineClipboardList } from "react-icons/hi";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Card>
      <CardContent>
        <Button variant="ghost" asChild>
          <Link to="perekaman">
            <HiOutlineClipboardList />
            <span>Rekam</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
