"use client";

import { InfoIcon, TagIcon } from "@primer/octicons-react";
import { Avatar, Dialog, Stack } from "@primer/react";
import { Blankslate } from "@primer/react/experimental";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Anchor, StatLabel } from "@/components";
import type { getReleases } from "@/lib/github";
import { prettyDate } from "@/lib/pretty-format";
import styles from "./ReleaseChangelogModal.module.css";

type ReleaseItem = Awaited<ReturnType<typeof getReleases>>[number];

type ReleaseChangelogModalProps = {
  isOpen: boolean;
  onClose: () => void;
  release: ReleaseItem | null;
};

export default function ReleaseChangelogModal({
  isOpen,
  onClose,
  release,
}: ReleaseChangelogModalProps) {
  if (!isOpen || !release) {
    return null;
  }

  return (
    <Dialog
      aria-labelledby="release-dialog-title"
      onClose={() => onClose()}
      position="center"
      role="dialog"
      subtitle={
        release.published_at
          ? `Published on ${prettyDate(release.published_at)}`
          : undefined
      }
      title={release.name || release.tag_name}
      width="xlarge"
    >
      <Dialog.Body className={styles.changelogBody}>
        <Stack
          align="center"
          className={styles.metaBar}
          direction="horizontal"
          gap="condensed"
          justify="space-between"
          padding="normal"
          wrap="wrap"
        >
          <Stack align="center" direction="horizontal" gap="normal" wrap="wrap">
            <StatLabel icon={TagIcon}>{release.tag_name}</StatLabel>
            {release.prerelease && (
              <StatLabel variant="severe">Pre-release</StatLabel>
            )}
            {release.draft && <StatLabel variant="attention">Draft</StatLabel>}
            {release.author && (
              <Anchor
                href={`/${release.author.login}`}
                leadingIcon={
                  <Avatar
                    alt={`${release.author.login} avatar`}
                    src={release.author.avatar_url}
                  />
                }
              >
                {release.author.login}
              </Anchor>
            )}
          </Stack>
          <Anchor href={release.html_url} isExternal>
            Detail
          </Anchor>
        </Stack>
        <Stack padding="normal">
          {release.body ? (
            <div>
              <ReactMarkdown
                components={{
                  a: ({ href, children }) => (
                    <Anchor href={href || "#"} isExternal={href !== undefined}>
                      {children}
                    </Anchor>
                  ),
                }}
                remarkPlugins={[remarkGfm]}
              >
                {release.body}
              </ReactMarkdown>
            </div>
          ) : (
            <Blankslate>
              <Blankslate.Visual>
                <InfoIcon />
              </Blankslate.Visual>
              <Blankslate.Description>
                No changelog provided for this release.
              </Blankslate.Description>
            </Blankslate>
          )}
        </Stack>
      </Dialog.Body>
    </Dialog>
  );
}
