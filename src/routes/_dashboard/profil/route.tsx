import { createFileRoute } from "@tanstack/react-router";

import { Card, CardHeader } from "@/components/ui/card";
import { Link, Outlet } from "@tanstack/react-router";

function ProfilLayout() {
  return (
    <div className="py-5">
      <div className="flex w-full flex-col px-5 md:px-8 lg:px-10 xl:px-12">
        <Card>
          <CardHeader>
            <div className="flex">
              <nav className="bg-accent mb-3 flex gap-1 rounded-2xl p-1.5">
                <Link
                  to="/profil"
                  activeOptions={{ exact: true }}
                  activeProps={{ className: "bg-background" }}
                  className="rounded-xl px-5 py-2 font-semibold transition-all"
                >
                  Update Profil
                </Link>
                <Link
                  to="/profil/ganti-password"
                  activeProps={{ className: "bg-background" }}
                  className="rounded-xl px-5 py-2 font-semibold transition-all"
                >
                  Ganti Password
                </Link>
              </nav>
            </div>

            <Outlet />
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_dashboard/profil")({
  component: ProfilLayout,
});
