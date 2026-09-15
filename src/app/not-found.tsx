import { Heading, Text } from "@primer/react";
import type { Metadata } from "next";
import { Content, RepoSidebar, Sidebar } from "@/components";

export const metadata: Metadata = {
  title: "Not Found",
  robots: {
    index: false,
  },
};

export default function NotFoundPage() {
  return (
    <>
      <Content>
        <Heading as="h2">Page Not Found</Heading>
        <Text as="p">
          You just hit a route that does not exist... the sadness.
        </Text>
      </Content>
      <Sidebar>
        <RepoSidebar />
      </Sidebar>
    </>
  );
}
