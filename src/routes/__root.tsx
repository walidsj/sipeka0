import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: HomeLayout,
});

function HomeLayout() {
  return <Outlet />;
}
