import { Outlet } from "react-router-dom";

export default function PengaturanLayout() {
  return (
    <div className="w-full">
      <Outlet />
    </div>
  );
}