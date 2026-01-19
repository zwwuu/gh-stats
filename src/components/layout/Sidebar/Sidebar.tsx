"use client";

import { ReactNode } from "react";
import { PageLayout, Stack } from "@primer/react";

import { Ads } from "@/components";

type SidebarProps = {
  children: ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
  return (
    <PageLayout.Pane divider="line" padding="normal" sticky>
      <Stack>
        {children}
        <Ads variant={"square"} />
      </Stack>
    </PageLayout.Pane>
  );
}
