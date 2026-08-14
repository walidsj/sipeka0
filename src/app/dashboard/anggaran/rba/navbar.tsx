import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  ClipboardCopyIcon,
  ClipboardPasteIcon,
  FileTextIcon,
} from "lucide-react";

export default function Navbar() {
  return (
    <Card>
      <CardContent>
        <Button variant="ghost" asChild>
          <Link to="daftar-rab">
            <ClipboardPasteIcon />
            Rencana Belanja
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="daftar-rap">
            <ClipboardCopyIcon />
            Rencana Pendapatan
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="penyusunan-rba">
            <FileTextIcon />
            Penyusunan RBA
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
