"use client";

import { useParams } from "next/navigation";
import { EyeIcon, GitBranchIcon, StarFillIcon, TagIcon } from "@primer/octicons-react";
import { Avatar, Banner, Heading, Label, Spinner, Stack, Text } from "@primer/react";
import useSWRImmutable from "swr/immutable";

import {
  Anchor,
  BookmarkButton,
  BookmarkList,
  Content,
  ReleaseList,
  SearchBar,
  Sidebar,
  StatLabel,
} from "@/components";
import commonStyles from "@/components/Common.module.css";
import { getReleases, getRepo } from "@/lib/github";
import { prettyNumber } from "@/lib/pretty-format";

const fetchRepo = async (params: { key: string; owner: string; repo: string }) => {
  const { owner, repo } = params;
  return await getRepo(owner, repo);
};

const fetchReleases = async (params: { key: string; owner: string; repo: string }) => {
  const { owner, repo } = params;
  return await getReleases(owner, repo);
};

export default function RepoPage() {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const {
    data: repoData,
    error: repoError,
    isLoading: isLoadingRepo,
  } = useSWRImmutable({ key: "repo", owner, repo }, fetchRepo);
  const {
    data: releasesData,
    error: releasesError,
    isLoading: isLoadingReleases,
  } = useSWRImmutable({ key: "release", owner, repo }, fetchReleases);

  if (isLoadingRepo || isLoadingReleases) {
    return (
      <>
        <Content>
          <Stack direction="horizontal" align="center">
            <Spinner size={"medium"} />
            <Text as={"p"}>
              {"Generating stats for "}
              <Text weight={"semibold"} as={"span"}>
                {owner}/{repo}
              </Text>
              ...
            </Text>
          </Stack>
        </Content>
        <Sidebar>
          <SearchBar />
          <BookmarkList />
        </Sidebar>
      </>
    );
  }

  if (repoError) {
    return (
      <>
        <Content>
          <Banner
            aria-label="Repository not found"
            title="Repository Not Found"
            hideTitle
            description={repoError.message}
            variant="critical"
          />
        </Content>
        <Sidebar>
          <SearchBar />
          <BookmarkList />
        </Sidebar>
      </>
    );
  }

  return (
    <>
      <Content>
        {repoData && (
          <>
            <div>
              <BookmarkButton
                className={commonStyles.floatRight}
                bookmark={{
                  fullName: repoData.full_name,
                  avatarUrl: repoData.owner.avatar_url,
                }}
              />
              <Heading as={"h1"} className={commonStyles.breakWord}>
                <Anchor
                  href={`/${owner}`}
                  leadingIcon={
                    <Avatar size={32} alt={`${repoData.owner.login} avatar`} src={repoData.owner.avatar_url} />
                  }
                >
                  {repoData.owner.login}
                </Anchor>
                <Text as={"span"}>{" / "}</Text>
                <Anchor href={`${repoData.html_url}`} isExternal>
                  {repoData.name}
                </Anchor>
              </Heading>
            </div>
            {repoData.description && <Text as={"p"}>{repoData.description}</Text>}
            <Stack wrap="wrap" direction="horizontal" gap="condensed" align="center">
              {repoData.language && <Label size="large">{repoData.language}</Label>}
              <StatLabel size="large" icon={StarFillIcon}>
                {prettyNumber(repoData.stargazers_count)} stars
              </StatLabel>
              <StatLabel size="large" icon={GitBranchIcon}>
                {prettyNumber(repoData.forks_count)} forks
              </StatLabel>
              <StatLabel size="large" icon={EyeIcon}>
                {prettyNumber(repoData.subscribers_count)} watching
              </StatLabel>
              <StatLabel size="large" icon={TagIcon}>
                {prettyNumber(releasesData?.length || 0)} releases
              </StatLabel>
            </Stack>
          </>
        )}

        {releasesError && (
          <Banner
            aria-label="No releases found"
            title="Not Found"
            hideTitle
            description={releasesError.message}
            variant="critical"
          />
        )}

        {releasesData &&
          (releasesData.length > 0 ? (
            <ReleaseList releases={releasesData} />
          ) : (
            <Banner
              aria-label="No releases found"
              title="Not Found"
              hideTitle
              description="No releases found for this repository."
              variant="warning"
            />
          ))}
      </Content>
      <Sidebar>
        <SearchBar />
        <BookmarkList />
      </Sidebar>
    </>
  );
}
