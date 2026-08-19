import { createFileRoute } from "@tanstack/react-router";

import { Outlet } from "@tanstack/react-router";

function ReferensiLayout() {
  return (
    <div className="w-full">
      <Outlet />
    </div>
  );
}

export const Route = createFileRoute("/_dashboard/lainnya/referensi")({
  component: ReferensiLayout,
});
