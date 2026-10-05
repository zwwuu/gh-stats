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

  const { data: repoData, isLoading: isRepoLoading } = useSWRImmutable(
    { key: "repo", owner, repo, token: settings.githubToken },
    (params) => getRepo(params.owner, params.repo, params.token),
  );

  const { data: releasesData, isLoading: isReleasesLoading } = useSWRImmutable(
    { key: "release", owner, repo, token: settings.githubToken },
    (params) => getReleases(params.owner, params.repo, params.token),
  );

  if (isRepoLoading || isReleasesLoading || !repoData || !releasesData) {
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

  return (
    <>
      <RepoHeader
        description={repoData.description}
        forksCount={repoData.forks_count}
        fullName={repoData.full_name}
        htmlUrl={repoData.html_url}
        language={repoData.language}
        owner={owner}
        ownerAvatarUrl={repoData.owner.avatar_url}
        ownerLogin={repoData.owner.login}
        releaseCount={releasesData.length}
        repo={repoData.name}
        stargazersCount={repoData.stargazers_count}
        subscribersCount={repoData.subscribers_count}
      />

      {releasesData.length > 0 ? (
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
      )}
    </>
  );
}
