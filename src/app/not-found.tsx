import type { Metadata } from "next";
import Image from "next/image";
import { Heading, Stack, Text } from "@primer/react";
import clsx from "clsx";

import { Ads, BookmarkList, Content, SearchBar, Sidebar } from "@/components";
import commonStyles from "@/components/Common.module.css";
import blankImg from "@/public/images/blank.png";

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
        <Text as="p">You just hit a route that does not exist... the sadness.</Text>
        <Stack as={"figure"} gap={"condensed"} className={commonStyles.m0}>
          <Image
            className={clsx(commonStyles.rounded, commonStyles.border, commonStyles.image)}
            src={blankImg}
            alt={"image of nothing"}
          />
          <Text as={"figcaption"}>An image of nothing</Text>
        </Stack>
        <Ads />
      </Content>
      <Sidebar>
        <SearchBar />
        <BookmarkList />
        <Ads />
      </Sidebar>
    </>
  );
}
