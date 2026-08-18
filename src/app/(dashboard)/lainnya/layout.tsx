import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
