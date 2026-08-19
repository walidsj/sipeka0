import { createFileRoute } from "@tanstack/react-router";

import { Outlet } from "@tanstack/react-router";

function Layout() {
  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_dashboard/lainnya")({
  component: Layout,
});
