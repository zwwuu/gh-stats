import { GitBranchIcon, StarFillIcon } from "@primer/octicons-react";
import { Avatar, RelativeTime, Stack, Text } from "@primer/react";
import {
  Anchor,
  BookmarkButton,
  Card,
  CardBody,
  CardHeader,
  StatLabel,
} from "@/components";
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

export default function RepoCard({
  fullName,
  avatarUrl,
  htmlUrl,
  description,
  stargazersCount,
  forksCount,
  language,
  pushedAt,
}: RepoCardProps) {
  return (
    <Card as="article">
      <CardHeader>
        <BookmarkButton
          bookmark={{ fullName, avatarUrl }}
          className={styles.bookmarkButton}
        />
        <Anchor
          className={styles.title}
          href={`/${fullName}`}
          leadingIcon={
            <Avatar
              alt={`${fullName} avatar`}
              src={avatarUrl ?? blankImg.src}
            />
          }
        >
          {fullName}
        </Anchor>
        {pushedAt && (
          <Text as={"p"} className={styles.caption}>
            Last update{" "}
            <RelativeTime
              date={new Date(pushedAt)}
              hour="numeric"
              minute="numeric"
              second="numeric"
            />
          </Text>
        )}
      </CardHeader>
      <CardBody>
        {description && <Text as="p">{description}</Text>}
        <Stack
          align="center"
          direction="horizontal"
          gap={"condensed"}
          wrap="wrap"
        >
          {language && <StatLabel size="large">{language}</StatLabel>}
          <StatLabel icon={StarFillIcon} size="large">
            {prettyNumber(stargazersCount)}
          </StatLabel>
          <StatLabel icon={GitBranchIcon} size="large">
            {prettyNumber(forksCount)}
          </StatLabel>
          <StatLabel size="large">
            <Anchor href={htmlUrl} isExternal>
              Open in GitHub
            </Anchor>
          </StatLabel>
        </Stack>
      </CardBody>
    </Card>
  );
}
