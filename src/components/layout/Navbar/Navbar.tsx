"use client";

import { MarkGithubIcon, MoonIcon, SunIcon } from "@primer/octicons-react";
import {
  Avatar,
  IconButton,
  PageHeader,
  PageLayout,
  Stack,
  useTheme,
} from "@primer/react";

import logo from "@/app/icon1.png";
import { Anchor, RateLimitStatus } from "@/components/ui";
import { useSettings } from "@/contexts";

export default function Navbar() {
  const { toggleTheme } = useSettings();
  const { resolvedColorMode } = useTheme();

  return (
    <PageLayout.Header padding="condensed" divider="line">
      <PageHeader role="banner" aria-label="Title">
        <PageHeader.TitleArea>
          <PageHeader.Title as={"h2"}>
            <Stack as={Anchor}  align="center"
               direction="horizontal"
        gap="none"
              href="/" 
              className="text-inherit decoration-none"
                          leadingIcon={
                <Avatar
                  square
                  size={32}
                  src={logo.src}
                  alt={`${process.env.NEXT_PUBLIC_APP_TITLE} logo`}
                />
              }
            >
              {process.env.NEXT_PUBLIC_APP_TITLE}
            </Stack>
          </PageHeader.Title>
        </PageHeader.TitleArea>
        <PageHeader.Actions>
          <RateLimitStatus />
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
