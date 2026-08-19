import { Link, Outlet } from "react-router-dom";
import {
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HiLockOpen,
  HiOutlineLogout,
  HiOutlineUser,
  HiUser,
} from "react-icons/hi";
import { useAuth } from "@/lib/auth";

export default function DashboardLayout() {
  const auth = useAuth();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex w-full flex-col gap-2">
        <div className="inline-flex w-full items-center justify-between px-6 pt-6">
          <SidebarTrigger />
          {auth.user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="w-fit">
                  <Avatar>
                    <AvatarImage
                      src={`https://ui-avatars.com/api/?name=${auth.user.nama}&background=3b82f6&color=fff`}
                    />
                    <AvatarFallback>
                      <HiOutlineUser />
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left lg:block">
                    <div className="block text-sm">{auth.user.nama}</div>
                    <div className="block text-xs font-normal text-slate-400">
                      {auth.user.pegawai?.pengelolaBlud &&
                      auth.user.pegawai?.pengelolaBlud.length > 0
                        ? auth.user.pegawai?.pengelolaBlud.map(
                            (blud, index) => (
                              <div
                                className="text-xs font-normal text-slate-400"
                                key={index}
                              >
                                {blud.role}
                              </div>
                            ),
                          )
                        : auth.user.pegawai?.jabatan || auth.user.instansi}
                    </div>
                    <div className="text-primary text-xs font-medium">
                      Tahun Anggaran {auth.user.tahun}
                    </div>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="profil">
                    <HiUser />
                    Profil Saya
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="profil/ganti-password">
                    <HiLockOpen />
                    Ganti Password
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => auth.logout()}>
                  <HiOutlineLogout /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="w-full p-6">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
