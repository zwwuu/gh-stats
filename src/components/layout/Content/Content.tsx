"use client";

import { PageLayout, Stack, type StackProps } from "@primer/react";
import type { ReactNode } from "react";

type ContentProps = {
  children: ReactNode;
  className?: string;
  gap?: StackProps<"main">["gap"];
};

export default function Content({ children, className, gap }: ContentProps) {
  return (
    <PageLayout.Content
      as={"div"}
      className={className}
      padding="normal"
      width={"xlarge"}
    >
      <Stack as={"main"} gap={gap}>
        {children}
      </Stack>
    </PageLayout.Content>
  );
}
