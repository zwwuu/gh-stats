import { GitBranchIcon, StarFillIcon } from "@primer/octicons-react";
import { Avatar, RelativeTime, Stack, Text } from "@primer/react";
import { SkeletonText } from "@primer/react/experimental";
import clsx from "clsx";

import { Anchor, BookmarkButton, Card, CardBody, CardHeader, StatLabel } from "@/components";
import commonStyles from "@/components/Common.module.css";
import { prettyNumber } from "@/lib/pretty-format";
import blankImg from "@/public/images/blank.png";
import styles from "./RepoCard.module.css";

type RepoCardProps = {
  fullName: string;
  avatarUrl?: string | null;
  htmlUrl: string;
  description?: string | null;
  stargazersCount: number;
  language?: string | null;
  forksCount: number;
  pushedAt?: string | null;
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

  const { fullName, avatarUrl, htmlUrl, description, stargazersCount, forksCount, language, pushedAt } =
    props as RepoCardProps;
  return (
    <Card as="article">
      <CardHeader>
        <BookmarkButton className={clsx(commonStyles.floatRight)} bookmark={{ fullName, avatarUrl }} />
        <Anchor
          className={clsx(commonStyles.breakWord)}
          href={`/${fullName}`}
          leadingIcon={<Avatar src={avatarUrl ?? blankImg.src} alt={`${fullName} avatar`} />}
        >
          {fullName}
        </Anchor>
        {pushedAt && (
          <Text as={"p"} className={clsx(commonStyles.mb0, styles.caption)}>
            Last update <RelativeTime second="numeric" minute="numeric" hour="numeric" date={new Date(pushedAt)} />
          </Text>
        )}
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
          <StatLabel size="large">
            <Anchor isExternal href={htmlUrl}>
              Open in GitHub
            </Anchor>
          </StatLabel>
        </Stack>
      </CardBody>
    </Card>
  );
}
