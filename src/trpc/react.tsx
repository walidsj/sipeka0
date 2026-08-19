import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "#server/router";
import SuperJSON from "superjson";
import { readCookie, refreshAccessToken } from "@/lib/token";
import { setTRPCClient } from "@/trpc/client";

const createQueryClient = () => new QueryClient();

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === "undefined") {
    return createQueryClient();
  }
  return (clientQueryClientSingleton ??= createQueryClient());
};

export const api = createTRPCReact<AppRouter>();

export type RouterInputs = inferRouterInputs<AppRouter>;

export type RouterOutputs = inferRouterOutputs<AppRouter>;

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const trpcClient = api.createClient({
    links: [
      httpBatchLink({
        transformer: SuperJSON,
        url: "/api/trpc",
        headers: () => {
          const headers = new Headers();
          const token = readCookie("token");
          if (token) {
            headers.set("authorization", token);
          }
          return headers;
        },
        fetch: async (input, init) => {
          const url =
            typeof input === "string"
              ? input
              : input instanceof Request
                ? input.url
                : input.toString();

          // Whitelist: request refresh tidak boleh memicu 401-retry lagi,
          // karena kalau refresh gagal justru akan masuk loop tak berujung.
          const isRefreshCall = url.includes("/api/trpc/user.refresh");

          let res = await fetch(input, init);

          if (res.status === 401 && !isRefreshCall) {
            const newToken = await refreshAccessToken();

            if (newToken) {
              const headers = new Headers(init?.headers);
              headers.set("authorization", newToken);
              res = await fetch(input, { ...init, headers });
            }
          }

          return res;
        },
      }),
    ],
  });

  setTRPCClient(trpcClient);

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
