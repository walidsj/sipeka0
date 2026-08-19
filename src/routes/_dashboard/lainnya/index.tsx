import { createFileRoute } from "@tanstack/react-router";

import { Navigate } from "@tanstack/react-router";

function Page() {
  return <Navigate to="/lainnya/database/unit-kerja" replace />;
}

export const Route = createFileRoute("/_dashboard/lainnya/")({
  component: Page,
});
