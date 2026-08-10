import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { Outlet } from "react-router-dom";

const Navbar = React.lazy(() => import("./navbar"));

export default function Layout() {
  return (
    <div className="flex w-full flex-col gap-4">
      <React.Suspense fallback={<Skeleton className="h-12 rounded-3xl" />}>
        <Navbar />
      </React.Suspense>
      <Outlet />
    </div>
  );
}
