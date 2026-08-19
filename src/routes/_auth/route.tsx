import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { FaHeart } from "react-icons/fa";
import { getTokenCookie } from "@/lib/cookies";

export const Route = createFileRoute("/_auth")({
  beforeLoad: () => {
    if (getTokenCookie()) {
      throw redirect({ to: "/" });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="bg-background flex min-h-[calc(100svh-80px)] flex-row">
      <div className="hidden bg-cover bg-center sm:block md:w-1/2 lg:w-2/5 [background-image:url(/images/side-img.jpg)]"></div>
      <div className="flex w-full flex-col items-center justify-center px-5 md:w-1/2 lg:w-3/5">
        <Outlet />
        <p className="py-5 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} SIPEKA - RSJD Atma Husada Mahakam
          <br />
          Powered with <FaHeart className="inline-block text-red-500" />
        </p>
      </div>
    </div>
  );
}
