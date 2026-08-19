import { createFileRoute } from "@tanstack/react-router";

import { Outlet } from "@tanstack/react-router";

function DatabaseLayout() {
  return (
    <div className="w-full">
      <Outlet />
    </div>
  );
}

export const Route = createFileRoute("/_dashboard/lainnya/database")({
  component: DatabaseLayout,
});
