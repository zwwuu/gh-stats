"use client";

import {
  CheckIcon,
  CopyIcon,
  InfoIcon,
  LinkExternalIcon,
  TagIcon,
} from "@primer/octicons-react";
import {
  Avatar,
  Button,
  Dialog,
  IconButton,
  Stack,
  Text,
  Tooltip,
} from "@primer/react";
import { useState } from "react";
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
  const [copied, setCopied] = useState(false);

  if (!isOpen || !release) {
    return null;
  }

  const handleCopy = () => {
    if (!release.body) return;
    navigator.clipboard.writeText(release.body);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

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
      <div className={styles.changelogContainer}>
        <div className={styles.metaBar}>
          <div className={styles.metaInfo}>
            <StatLabel icon={TagIcon} size="large">
              {release.tag_name}
            </StatLabel>
            {release.prerelease && (
              <StatLabel variant="severe">Pre-release</StatLabel>
            )}
            {release.draft && <StatLabel variant="attention">Draft</StatLabel>}
            {release.author && (
              <Stack align="center" direction="horizontal" gap="condensed">
                <Avatar
                  alt={`${release.author.login} avatar`}
                  size={20}
                  src={release.author.avatar_url}
                />
                <Text as="span" size="small" weight="semibold">
                  {release.author.login}
                </Text>
              </Stack>
            )}
          </div>

          <div className={styles.actions}>
            {release.body && (
              <Tooltip
                direction="s"
                text={copied ? "Copied changelog!" : "Copy markdown"}
              >
                <IconButton
                  aria-label={copied ? "Copied!" : "Copy markdown"}
                  icon={copied ? CheckIcon : CopyIcon}
                  onClick={handleCopy}
                  size="small"
                />
              </Tooltip>
            )}
            <Button
              as="a"
              href={release.html_url}
              rel="noopener noreferrer"
              size="small"
              target="_blank"
              trailingVisual={LinkExternalIcon}
            >
              GitHub Release
            </Button>
          </div>
        </div>

        {release.body && release.body.trim().length > 0 ? (
          <div className={styles.markdownBody}>
            <ReactMarkdown
              components={{
                a: ({ href, children }) => (
                  <Anchor href={href || "#"} isExternal>
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
          <div className={styles.emptyState}>
            <InfoIcon size={24} />
            <Text as="p" weight="semibold">
              No changelog notes provided for this release.
            </Text>
            <Text as="p" size="small">
              View the release on GitHub to inspect commit comparisons and
              assets.
            </Text>
          </div>
        )}
      </div>
    </Dialog>
  );
}
