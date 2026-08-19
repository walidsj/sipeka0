import * as React from "react";
import { Spinner } from "@/components/ui/spinner";
import { ErrorBoundary } from "@/components/error-boundary";

export function TableBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={(error) => <div>{error.message}</div>}>
      <React.Suspense fallback={<Spinner />}>{children}</React.Suspense>
    </ErrorBoundary>
  );
}
