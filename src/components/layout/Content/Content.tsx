"use client";

import { PageLayout, Stack } from "@primer/react";
import type { ReactNode } from "react";

type ContentProps = {
  children: ReactNode;
  className?: string;
};

export default function Content({ children, className }: ContentProps) {
  return (
    <PageLayout.Content
      as={"div"}
      className={className}
      padding="normal"
      width={"xlarge"}
    >
      <Stack as={"main"}>{children}</Stack>
    </PageLayout.Content>
  );
}
