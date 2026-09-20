import {
  EyeIcon,
  GitBranchIcon,
  StarFillIcon,
  TagIcon,
} from "@primer/octicons-react";
import { Avatar, Heading, Label, Stack, Text } from "@primer/react";
import { Anchor, BookmarkButton, StatLabel } from "@/components";
import { prettyNumber } from "@/lib/pretty-format";
import styles from "../RepoDetailsClient.module.css";

type RepoHeaderProps = {
  owner: string;
  repo: string;
  fullName: string;
  ownerLogin: string;
  ownerAvatarUrl: string;
  htmlUrl: string;
  description?: string | null;
  language?: string | null;
  stargazersCount: number;
  forksCount: number;
  subscribersCount: number;
  releaseCount: number;
};

export default function RepoHeader({
  owner,
  repo,
  fullName,
  ownerLogin,
  ownerAvatarUrl,
  htmlUrl,
  description,
  language,
  stargazersCount,
  forksCount,
  subscribersCount,
  releaseCount,
}: RepoHeaderProps) {
  return (
    <>
      <div>
        <BookmarkButton
          bookmark={{ fullName, avatarUrl: ownerAvatarUrl }}
          className={styles.bookmarkButton}
        />
        <Heading as="h1" className={styles.title}>
          <Anchor
            href={`/${owner}`}
            leadingIcon={
              <Avatar
                alt={`${ownerLogin} avatar`}
                size={32}
                src={ownerAvatarUrl}
              />
            }
          >
            {ownerLogin}
          </Anchor>
          <Text as="span">/</Text>
          <Anchor href={htmlUrl} isExternal>
            {repo}
          </Anchor>
        </Heading>
      </div>
      {description && <Text as="p">{description}</Text>}
      <Stack align="center" direction="horizontal" gap="condensed" wrap="wrap">
        {language && <Label size="large">{language}</Label>}
        <StatLabel icon={StarFillIcon} size="large">
          {prettyNumber(stargazersCount)} stars
        </StatLabel>
        <StatLabel icon={GitBranchIcon} size="large">
          {prettyNumber(forksCount)} forks
        </StatLabel>
        <StatLabel icon={EyeIcon} size="large">
          {prettyNumber(subscribersCount)} watching
        </StatLabel>
        <StatLabel icon={TagIcon} size="large">
          {prettyNumber(releaseCount)} releases
        </StatLabel>
      </Stack>
    </>
  );
}
