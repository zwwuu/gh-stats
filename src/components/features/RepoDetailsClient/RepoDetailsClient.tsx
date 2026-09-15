"use client";

import {
  EyeIcon,
  GitBranchIcon,
  StarFillIcon,
  TagIcon,
} from "@primer/octicons-react";
import {
  Avatar,
  Banner,
  Heading,
  Label,
  Spinner,
  Stack,
  Text,
} from "@primer/react";
import useSWRImmutable from "swr/immutable";
import {
  Anchor,
  BookmarkButton,
  ReleaseList,
  StatChart,
  StatLabel,
} from "@/components";
import { useSettings } from "@/contexts";
import { getReleases, getRepo } from "@/lib/github";
import { prettyNumber } from "@/lib/pretty-format";
import styles from "./RepoDetailsClient.module.css";

type RepoDetailsClientProps = {
  owner: string;
  repo: string;
};

export default function RepoDetailsClient({
  owner,
  repo,
}: RepoDetailsClientProps) {
  const { settings } = useSettings();

  const {
    data: repoData,
    error: repoError,
    isLoading: isLoadingRepo,
  } = useSWRImmutable(
    { key: "repo", owner, repo, token: settings.githubToken },
    (params) => getRepo(params.owner, params.repo, params.token),
  );

  const {
    data: releasesData,
    error: releasesError,
    isLoading: isLoadingReleases,
  } = useSWRImmutable(
    { key: "release", owner, repo, token: settings.githubToken },
    (params) => getReleases(params.owner, params.repo, params.token),
  );

  if (isLoadingRepo || isLoadingReleases) {
    return (
      <Stack align="center" direction="horizontal">
        <Spinner size={"medium"} />
        <Text as={"p"}>
          {"Generating stats for "}
          <Text as={"span"} weight={"semibold"}>
            {owner}/{repo}
          </Text>
          ...
        </Text>
      </Stack>
    );
  }

  if (repoError) {
    return (
      <Banner
        aria-label="Repository not found"
        description={repoError.message}
        hideTitle
        title="Repository Not Found"
        variant="critical"
      />
    );
  }

  return (
    <>
      {repoData && (
        <>
          <div>
            <BookmarkButton
              bookmark={{
                fullName: repoData.full_name,
                avatarUrl: repoData.owner.avatar_url,
              }}
              className={styles.bookmarkButton}
            />
            <Heading as={"h1"} className={styles.title}>
              <Anchor
                href={`/${owner}`}
                leadingIcon={
                  <Avatar
                    alt={`${repoData.owner.login} avatar`}
                    size={32}
                    src={repoData.owner.avatar_url}
                  />
                }
              >
                {repoData.owner.login}
              </Anchor>
              <Text as={"span"}>/</Text>
              <Anchor href={`${repoData.html_url}`} isExternal>
                {repoData.name}
              </Anchor>
            </Heading>
          </div>
          {repoData.description && <Text as={"p"}>{repoData.description}</Text>}
          <Stack
            align="center"
            direction="horizontal"
            gap="condensed"
            wrap="wrap"
          >
            {repoData.language && (
              <Label size="large">{repoData.language}</Label>
            )}
            <StatLabel icon={StarFillIcon} size="large">
              {prettyNumber(repoData.stargazers_count)} stars
            </StatLabel>
            <StatLabel icon={GitBranchIcon} size="large">
              {prettyNumber(repoData.forks_count)} forks
            </StatLabel>
            <StatLabel icon={EyeIcon} size="large">
              {prettyNumber(repoData.subscribers_count)} watching
            </StatLabel>
            <StatLabel icon={TagIcon} size="large">
              {prettyNumber(releasesData?.length || 0)} releases
            </StatLabel>
          </Stack>
        </>
      )}

      {releasesError && (
        <Banner
          aria-label="No releases found"
          description={releasesError.message}
          hideTitle
          title="Not Found"
          variant="critical"
        />
      )}

      {releasesData &&
        (releasesData.length > 0 ? (
          <>
            <StatChart releases={releasesData} />
            <ReleaseList owner={owner} releases={releasesData} repo={repo} />
          </>
        ) : (
          <Banner
            aria-label="No releases found"
            description="No releases found for this repository."
            hideTitle
            title="Not Found"
            variant="warning"
          />
        ))}
    </>
  );
}
