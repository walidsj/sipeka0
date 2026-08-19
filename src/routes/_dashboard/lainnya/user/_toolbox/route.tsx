import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_dashboard/lainnya/user/_toolbox")({
  component: Protected,
});

function Protected() {
  const { user } = useAuth();

  if (user?.role !== "ADMIN") {
    return <Navigate to="/lainnya/user" replace />;
  }

  return <Outlet />;
}
