import * as React from "react";

export function ErrorBoundary({
  fallback,
  children,
}: {
  fallback: (error: Error) => React.ReactNode;
  children: React.ReactNode;
}) {
  const [error, setError] = React.useState<Error | null>(null);

  if (error) {
    return <>{fallback(error)}</>;
  }

  return <ErrorBoundaryImpl onError={setError}>{children}</ErrorBoundaryImpl>;
}

class ErrorBoundaryImpl extends React.Component<
  { onError: (error: Error) => void; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}
