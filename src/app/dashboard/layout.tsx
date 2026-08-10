import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex w-full flex-col gap-2">
        <div className="w-full px-6 pt-6">
          <SidebarTrigger />
        </div>
        <div className="w-full p-6">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
