"use client";

import { MarkGithubIcon, MoonIcon, SunIcon } from "@primer/octicons-react";
import { Avatar, IconButton, PageHeader, PageLayout, useTheme } from "@primer/react";
import clsx from "clsx";

import logo from "@/app/icon1.png";
import commonStyles from "@/components/Common.module.css";
import { Anchor } from "@/components/ui";
import { useSettings } from "@/contexts";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { toggleTheme } = useSettings();
  const { resolvedColorMode } = useTheme();

  return (
    <PageLayout.Header padding="condensed" divider="line">
      <PageHeader role="banner" aria-label="Title">
        <PageHeader.TitleArea>
          <PageHeader.Title as={"h2"}>
            <Anchor
              href="/"
              className={clsx(styles.title, commonStyles.inlineFlex, commonStyles.alignCenter)}
              leadingIcon={<Avatar square size={32} src={logo.src} alt={`${process.env.NEXT_PUBLIC_APP_TITLE} logo`} />}
            >
              {process.env.NEXT_PUBLIC_APP_TITLE}
            </Anchor>
          </PageHeader.Title>
        </PageHeader.TitleArea>
        <PageHeader.Actions>
          <IconButton
            aria-label={"Toggle theme"}
            onClick={(event) => {
              event.preventDefault();
              toggleTheme();
            }}
            icon={resolvedColorMode === "day" ? SunIcon : MoonIcon}
          />
          <IconButton
            as={Anchor}
            variant="link"
            showExternalIcon={false}
            href={`${process.env.NEXT_PUBLIC_GITHUB_URL}`}
            aria-label={"Source Code"}
            isExternal
            icon={MarkGithubIcon}
          />
        </PageHeader.Actions>
      </PageHeader>
    </PageLayout.Header>
  );
}
