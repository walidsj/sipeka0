import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HiOutlineBookmarkAlt, HiOutlineClipboardList } from "react-icons/hi";

import { Card, CardContent } from "@/components/ui/card";

export default function Navbar() {
  return (
    <Card>
      <CardContent>
        <Button variant="ghost" asChild>
          <Link to="perekaman">
            <HiOutlineClipboardList />
            Rekam
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="lpj-belanja">
            <HiOutlineBookmarkAlt />
            LPJ Belanja
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="spp">
            <HiOutlineBookmarkAlt />
            SPP
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="spm">
            <HiOutlineBookmarkAlt />
            SPM
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="sp2d">
            <HiOutlineBookmarkAlt />
            SP2D
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="buku/kas-umum">
            <HiOutlineBookmarkAlt />
            Buku Bendahara
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
