"use client";

import { ReactNode } from "react";
import { PageLayout, Stack } from "@primer/react";

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
