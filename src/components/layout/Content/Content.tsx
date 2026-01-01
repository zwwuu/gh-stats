"use client";

import { ReactNode } from "react";
import { PageLayout, Stack } from "@primer/react";

import { Footer } from "@/components";

type ContentProps = {
  children: ReactNode;
  className?: string;
};

export default function Content({ children, className }: ContentProps) {
  return (
    <PageLayout.Content padding="normal" width={"xlarge"} as={"div"} className={className}>
      <Stack as={"main"}>{children}</Stack>
      <Footer />
    </PageLayout.Content>
  );
}
