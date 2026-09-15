"use client";

import { MarkGithubIcon } from "@primer/octicons-react";
import {
  Avatar,
  IconButton,
  PageHeader,
  PageLayout,
  Stack,
} from "@primer/react";
import logo from "@/app/icon1.png";
import { Anchor, RateLimitStatus, ThemeToggleButton } from "@/components";
import commonStyles from "@/components/Common.module.css";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <PageLayout.Header divider="line" padding="condensed">
      <PageHeader aria-label="Title" role="banner">
        <PageHeader.TitleArea>
          <PageHeader.Title as={"h2"}>
            <Stack
              as={Anchor}
              className={commonStyles.textDefault}
              direction="horizontal"
              gap="normal"
              href="/"
            >
              <Avatar
                alt={`${process.env.NEXT_PUBLIC_APP_TITLE} logo`}
                size={32}
                square
                src={logo.src}
              />
              <span className={styles.title}>
                {process.env.NEXT_PUBLIC_APP_TITLE}
              </span>
            </Stack>
          </PageHeader.Title>
        </PageHeader.TitleArea>
        <PageHeader.Actions>
          <RateLimitStatus />
          <ThemeToggleButton />
          <IconButton
            aria-label={"Source Code"}
            as={Anchor}
            href={`${process.env.NEXT_PUBLIC_GITHUB_URL}`}
            icon={MarkGithubIcon}
            isExternal
            showExternalIcon={false}
            variant="link"
          />
        </PageHeader.Actions>
      </PageHeader>
    </PageLayout.Header>
  );
}
