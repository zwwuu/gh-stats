"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { EyeIcon, GitBranchIcon, GitCommitIcon, RepoIcon, StarFillIcon, TagIcon } from "@primer/octicons-react";
import { Avatar, Banner, Heading, Label, Spinner, Stack, Text, Timeline } from "@primer/react";
import useSWRImmutable from "swr/immutable";

import { Anchor, Card, CardBody, SearchSection } from "@/components";
import Content from "@/components/layout/Content/Content";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import BookmarkSection from "@/components/sections/BookmarkSection/BookmarkSection";
import BookmarkButton from "@/components/ui/BookmarkButton/BookmarkButton";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
import StatLabel from "@/components/ui/StatLabel/StatLabel";
import { getReleases, getRepo } from "@/lib/github";
import { prettyNumber } from "@/lib/pretty-format";
import styles from "./RepoPage.module.css";

const fetchRepo = async (params: { owner: string; repo: string; page: number }) => {
  const { owner, repo } = params;
  const res = await getRepo(owner, repo);

  return res.data;
};

const fetchReleases = async (params: { owner: string; repo: string; page: number }) => {
  const { owner, repo } = params;
  const res = await getReleases(owner, repo);

  return res.data;
};

const releaseDownloadData: { [id: number]: number } = {};

const calculateReleaseDownloads = (assets: { download_count: number }[]) => {
  return assets.reduce((accumulator: number, currentValue) => {
    return accumulator + currentValue.download_count;
  }, 0);
};

const calculateTotalDownloads = (releases) => {
  return releases.reduce((accumulator: number, currentValue, index) => {
    const releaseDownloads = calculateReleaseDownloads(currentValue.assets);
    releaseDownloadData[releases[index].id] = releaseDownloads;

    return accumulator + releaseDownloads;
  }, 0);
};

export default function RepoPage() {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();

  const { data: repoData, error: repoError } = useSWRImmutable({ owner, repo }, fetchRepo);
  const { data: releasesData, error: releasesError } = useSWRImmutable({ owner, repo }, fetchReleases);
  const downloadCount = 0;

  useEffect(() => {
    console.log(releasesData);
  }, [releasesData]);

  // const downloadCount = useMemo(() => {
  //   if (releasesData && releasesData.items.length) {
  //     return calculateTotalDownloads(releasesData.items);
  //   }
  //
  //   return 0;
  // }, [releasesData]);

  return (
    <>
      <Content>
        {repoError && (
          <>
            <SearchSection />
            <Banner
              aria-label="Repository not found"
              title="Not Found"
              hideTitle
              description={repoError.message}
              variant="critical"
            />
          </>
        )}
        {!repoData && !repoError && (
          <div>
            <Spinner size="large" />
            <Text as={"p"}>
              Generating stats for{" "}
              <Text weight={"semibold"} as={"span"}>
                <RepoIcon />
                {`${owner}/${repo}`}
              </Text>
            </Text>
          </div>
        )}
        {repoData && (
          <>
            <div>
              <BookmarkButton className={styles.bookmarkButton} />
              <Heading as={"h2"} className={styles.repoTitle}>
                <Anchor
                  href={repoData.owner.html_url}
                  isExternal
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
            <Stack>
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
                  {prettyNumber(releasesData?.items?.length || 0)} tags
                </StatLabel>
              </Stack>
            </Stack>
            <Card>
              <CardBody>
                <Heading as={"h3"}>
                  <Text as="span">{prettyNumber(downloadCount, false)}</Text>
                  Total Downloads
                </Heading>
                <Heading as={"h3"}>
                  Most Downloaded
                  <Text as="span">{prettyNumber(downloadCount, false)}</Text>
                </Heading>
                <Heading as={"h3"}>
                  Least Downloaded
                  <Text as="span">{prettyNumber(downloadCount, false)}</Text>
                </Heading>
                <Heading as={"h3"}>
                  Average <Text as="span">{prettyNumber(downloadCount, false)}</Text>
                  Downloads Per Release
                </Heading>
              </CardBody>
            </Card>
            <>
              {releasesData ? (
                <Timeline>
                  <Timeline.Item>
                    <Timeline.Badge>
                      <GitCommitIcon aria-label="Release" />
                    </Timeline.Badge>
                    <Timeline.Body>This is a message</Timeline.Body>
                  </Timeline.Item>
                  {/*<ReleaseList assetData={releaseDownloadData} releases={releasesData.items} />*/}
                </Timeline>
              ) : (
                <Banner
                  aria-label="No releases found"
                  title="Not Found"
                  hideTitle
                  description="No release assets found for this repository."
                  variant="critical"
                />
              )}
            </>
          </>
        )}
      </Content>
      <Sidebar>
        <SearchBar />
        <BookmarkSection />
      </Sidebar>
    </>
  );
}
