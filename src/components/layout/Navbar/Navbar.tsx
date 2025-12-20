"use client";

import { MarkGithubIcon, MoonIcon, SunIcon } from "@primer/octicons-react";
import { Avatar, IconButton, PageHeader, PageLayout, useTheme } from "@primer/react";

import logo from "@/app/icon1.png";
import { Anchor } from "@/components/ui";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { resolvedColorMode, setColorMode } = useTheme();

  const toggleColorMode = () => {
    const mode = resolvedColorMode === "dark" ? "light" : "dark";
    setColorMode(mode);
  };

  const ThemeIcon = resolvedColorMode === "light" ? SunIcon : MoonIcon;

  return (
    <PageLayout.Header padding="normal" divider="line">
      <PageHeader role="banner" aria-label="Title">
        <PageHeader.TitleArea>
          <PageHeader.Title as={"h1"}>
            <Anchor
              href="/"
              className={styles.title}
              leadingIcon={<Avatar square size={32} src={logo.src} alt={`${process.env.NEXT_PUBLIC_APP_TITLE} logo`} />}
            >
              {process.env.NEXT_PUBLIC_APP_TITLE}
            </Anchor>
          </PageHeader.Title>
        </PageHeader.TitleArea>
        <PageHeader.Actions>
          <IconButton aria-label={"Toggle theme"} onClick={toggleColorMode} icon={ThemeIcon} />
          <IconButton
            as={Anchor}
            variant="link"
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
