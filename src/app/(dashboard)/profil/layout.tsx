import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { NavLink, Outlet } from "react-router-dom";

export default function ProfilLayout() {
  return (
    <div className="py-5">
      <div className="flex w-full flex-col px-5 md:px-8 lg:px-10 xl:px-12">
        <Card>
          <CardHeader>
            <div className="flex">
              <nav className="bg-accent mb-3 flex gap-1 rounded-2xl p-1.5">
                <NavLink
                  to="."
                  end
                  className={({ isActive }) =>
                    cn(
                      "rounded-xl px-5 py-2 font-semibold transition-all",
                      isActive && "bg-background",
                    )
                  }
                >
                  Update Profil
                </NavLink>
                <NavLink
                  to="ganti-password"
                  className={({ isActive }) =>
                    cn(
                      "rounded-xl px-5 py-2 font-semibold transition-all",
                      isActive && "bg-background",
                    )
                  }
                >
                  Ganti Password
                </NavLink>
              </nav>
            </div>

            <Outlet />
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
