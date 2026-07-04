import { Heading, Stack, Text } from "@primer/react";
import type { Metadata } from "next";
import Image from "next/image";

import { Content, RepoSidebar, Sidebar } from "@/components";
import blankImg from "@/public/images/blank.png";
import styles from "./not-found.module.css";

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
        <Stack as={"figure"} gap={"condensed"} className={styles.figure}>
          <Image
            className={styles.image}
            src={blankImg}
            alt={"image of nothing"}
          />
          <Text as={"figcaption"}>An image of nothing</Text>
        </Stack>
      </Content>
      <Sidebar>
        <RepoSidebar />
      </Sidebar>
    </>
  );
}
