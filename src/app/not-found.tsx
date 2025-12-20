import { Metadata } from "next";
import Image from "next/image";
import { Heading, Text } from "@primer/react";

import { Ads, BookmarkSection } from "@/components";
import Content from "@/components/layout/Content/Content";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
import blankImage from "../../public/images/blank.png";
import styles from "./NotFoundPage.module.css";

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
        <figure className={styles.figure}>
          <Image className={styles.blankImg} src={blankImage} alt={"image of nothing"} />
          <Text as={"figcaption"} className={styles.caption}>
            An image of nothing
          </Text>
        </figure>
        <Ads />
      </Content>
      <Sidebar>
        <SearchBar />
        <BookmarkSection />
      </Sidebar>
    </>
  );
}
