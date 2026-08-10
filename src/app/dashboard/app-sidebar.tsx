import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import React from "react";
import {
  FiEdit,
  FiFileText,
  FiHome,
  FiPocket,
  FiShoppingCart,
  FiTool,
} from "react-icons/fi";
import { HiOutlineBookOpen } from "react-icons/hi";
import { Link } from "react-router-dom";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuButton size="lg">
          <Link to="/" className="flex h-20 flex-shrink-0 items-center gap-4">
            <img
              src="/images/logo-sipeka-full-long.svg"
              alt="Logo Atmaku"
              className={cn("block h-9")}
            />
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuButton asChild>
              <Link to="/dashboard">
                <FiHome /> Dashboard
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <Link to="anggaran">
                <FiEdit /> Anggaran
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <Link to="pendapatan/perekaman">
                <FiPocket /> Pendapatan
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <Link to="belanja/perekaman">
                <FiShoppingCart /> Belanja
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <Link to="akuntansi">
                <FiFileText /> Akuntansi
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <Link to="lainnya">
                <FiTool /> Lainnya
              </Link>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild>
          <Link to="/panduan">
            <HiOutlineBookOpen /> Panduan Penggunaan
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
