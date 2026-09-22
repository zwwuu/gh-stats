"use client";

import { Banner, Button, Heading, Stack } from "@primer/react";
import { useEffect } from "react";
import { Content, RepoSidebar, Sidebar } from "@/components";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Content>
        <Stack direction="vertical" gap="normal">
          <Heading as="h2">Something went wrong!</Heading>
          <Banner
            aria-label="Error"
            description={
              error.message ||
              "An unexpected error occurred while loading this page."
            }
            hideTitle
            primaryAction={
              <Button onClick={() => reset()} variant="default">
                Try again
              </Button>
            }
            title="Error"
            variant="critical"
          />
        </Stack>
      </Content>
      <Sidebar>
        <RepoSidebar />
      </Sidebar>
    </>
  );
}
