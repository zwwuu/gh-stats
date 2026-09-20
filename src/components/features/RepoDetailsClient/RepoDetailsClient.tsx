"use client";

import { Banner, Spinner, Stack, Text } from "@primer/react";
import useSWRImmutable from "swr/immutable";
import { ReleaseList, StatChart } from "@/components";
import { useSettings } from "@/contexts";
import { getReleases, getRepo } from "@/lib/github";
import RepoHeader from "./RepoHeader/RepoHeader";

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
        <Spinner size="medium" />
        <Text as="p">
          Generating stats for{" "}
          <Text as="span" weight="semibold">
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
        <RepoHeader
          description={repoData.description}
          forksCount={repoData.forks_count}
          fullName={repoData.full_name}
          htmlUrl={repoData.html_url}
          language={repoData.language}
          owner={owner}
          ownerAvatarUrl={repoData.owner.avatar_url}
          ownerLogin={repoData.owner.login}
          releaseCount={releasesData?.length ?? 0}
          repo={repoData.name}
          stargazersCount={repoData.stargazers_count}
          subscribersCount={repoData.subscribers_count}
        />
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
