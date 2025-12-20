import { GitBranchIcon, LinkExternalIcon, StarFillIcon } from "@primer/octicons-react";
import { Avatar, Stack, Text } from "@primer/react";
import { SkeletonText } from "@primer/react/experimental";

import { CardBody } from "@/components";
import { Anchor, Card, CardHeader } from "@/components/ui";
import BookmarkButton from "@/components/ui/BookmarkButton/BookmarkButton";
import StatLabel from "@/components/ui/StatLabel/StatLabel";
import { prettyNumber } from "@/lib/pretty-format";
import blankImg from "../../../../public/images/blank.png";
import styles from "./RepoCard.module.css";

type RepoCardProps = {
  fullName: string;
  avatarUrl?: string;
  htmlUrl: string;
  description?: string;
  stargazersCount: number;
  language?: string;
  forksCount: number;
};

type ConditionalRepoCardProps = { isLoading: true } | ({ isLoading?: false } & RepoCardProps);

export default function RepoCard({ isLoading = false, ...props }: ConditionalRepoCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <SkeletonText size="titleLarge" />
        </CardHeader>
        <CardBody>
          <SkeletonText size="bodyMedium" lines={3} />
          <Stack direction="horizontal" align="center" gap={"condensed"} wrap="wrap">
            <SkeletonText size="bodyMedium" maxWidth={"8ch"} />
            <SkeletonText size="bodyMedium" maxWidth={"8ch"} />
            <SkeletonText size="bodyMedium" maxWidth={"8ch"} />
            <SkeletonText size="bodyMedium" maxWidth={"8ch"} />
          </Stack>
        </CardBody>
      </Card>
    );
  }

  const { fullName, avatarUrl, htmlUrl, description, stargazersCount, language, forksCount } = props as RepoCardProps;
  return (
    <Card as="article">
      <CardHeader>
        <BookmarkButton className={styles.bookmarkButton} />
        <Anchor
          className={styles.cardTitle}
          href={`/${fullName}`}
          leadingIcon={<Avatar src={avatarUrl ?? blankImg.src} alt={`${fullName} avatar`} />}
        >
          {fullName}
        </Anchor>
      </CardHeader>
      <CardBody>
        {description && <Text as="p">{description}</Text>}
        <Stack direction="horizontal" align="center" gap={"condensed"} wrap="wrap">
          {language && <StatLabel size="large"> {language} </StatLabel>}
          <StatLabel size="large" icon={StarFillIcon}>
            {prettyNumber(stargazersCount)}
          </StatLabel>
          <StatLabel size="large" icon={GitBranchIcon}>
            {prettyNumber(forksCount)}
          </StatLabel>
          <Anchor isExternal href={htmlUrl}>
            <StatLabel size="large" icon={LinkExternalIcon} variant={"primary"}>
              Open in GitHub
            </StatLabel>
          </Anchor>
        </Stack>
      </CardBody>
    </Card>
  );
}
