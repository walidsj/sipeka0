import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "#server/router";

const api = createTRPCReact<AppRouter>();

export type TRPCClientInstance = ReturnType<typeof api.createClient>;

let trpcClient: TRPCClientInstance | null = null;

export function setTRPCClient(client: TRPCClientInstance) {
  trpcClient = client;
}

export function getTRPCClient(): TRPCClientInstance | null {
  return trpcClient;
}