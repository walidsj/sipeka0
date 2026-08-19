import "@/styles/globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { TRPCReactProvider } from "@/trpc/react";
import { CookiesProvider } from "react-cookie";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const elem = document.getElementById("root")!;

createRoot(elem).render(
  <StrictMode>
    <CookiesProvider>
      <TRPCReactProvider>
        <RouterProvider router={router} />
        <Toaster />
      </TRPCReactProvider>
    </CookiesProvider>
  </StrictMode>,
);
