import { Outlet } from "react-router-dom";

export default function DatabaseLayout() {
  return (
    <div className="w-full">
      <Outlet />
    </div>
  );
}