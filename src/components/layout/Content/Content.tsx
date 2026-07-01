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
      padding="normal"
      width={"xlarge"}
      as={"div"}
      className={className}
    >
      <Stack as={"main"}>{children}</Stack>
    </PageLayout.Content>
  );
}
