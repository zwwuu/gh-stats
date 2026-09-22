"use client";

import { Banner, Button, Stack } from "@primer/react";

export type ErrorFallbackProps = {
  error?: Error | unknown;
  resetErrorBoundary?: () => void;
};

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred.";

  return (
    <Stack direction="vertical" gap="normal">
      <Banner
        aria-label="Error"
        description={message}
        hideTitle
        primaryAction={
          resetErrorBoundary ? (
            <Button onClick={resetErrorBoundary} variant="default">
              Try again
            </Button>
          ) : undefined
        }
        title="Error"
        variant="critical"
      />
    </Stack>
  );
}
