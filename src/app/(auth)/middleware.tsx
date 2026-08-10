import { useAuth } from "@/lib/auth";
import { Navigate, Outlet } from "react-router-dom";

export default function Middleware() {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
