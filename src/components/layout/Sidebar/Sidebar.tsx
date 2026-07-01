"use client";

import { PageLayout, Stack } from "@primer/react";
import type { ReactNode } from "react";

type SidebarProps = {
  children: ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
  return (
    <PageLayout.Pane divider="line" padding="normal" sticky>
      <Stack>{children}</Stack>
    </PageLayout.Pane>
  );
}
