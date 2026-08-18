import { Outlet } from "react-router-dom";

export default function RBALayout() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Outlet />
    </div>
  );
}
