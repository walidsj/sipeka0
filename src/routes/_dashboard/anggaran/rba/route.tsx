import { createFileRoute } from "@tanstack/react-router";

import { Outlet } from "@tanstack/react-router";

function RBALayout() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Outlet />
    </div>
  );
}

export const Route = createFileRoute("/_dashboard/anggaran/rba")({
  component: RBALayout,
});
