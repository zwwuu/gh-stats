import { Stack, Text } from "@primer/react";
import { Anchor } from "@/components";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <Stack
      align={"center"}
      as={"footer"}
      className={styles.footer}
      direction={"vertical"}
      padding={"normal"}
      width={"xlarge"}
    >
      <Stack direction={"horizontal"} justify={"center"} wrap={"wrap"}>
        <Anchor href="/about">About</Anchor>
        <Anchor href="/contact-us">Contact</Anchor>
        <Anchor href="/privacy-policy">Privacy Policy</Anchor>
        <Anchor href="/terms-of-service">Terms of Service</Anchor>
      </Stack>
      <Text
        as={"p"}
      >{`© ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_APP_TITLE}. All rights reserved.`}</Text>
    </Stack>
  );
}
