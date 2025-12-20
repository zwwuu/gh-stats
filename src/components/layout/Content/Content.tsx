"use client";

import { ReactNode } from "react";
import { PageLayout, Stack } from "@primer/react";

import { Footer } from "@/components";

type ContentProps = {
  children: ReactNode;
};

export default function Content({ children }: ContentProps) {
  return (
    <PageLayout.Content padding="normal" width={"xlarge"}>
      <Stack>{children}</Stack>
      <Footer />
    </PageLayout.Content>
  );
}
