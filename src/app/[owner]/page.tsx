"use client";

import { useParams } from "next/navigation";
import { Banner, Heading } from "@primer/react";
import useSWRImmutable from "swr/immutable";

import { Ads, BookmarkList, Content, RepoGrid, SearchBar, Sidebar } from "@/components";
import { getUserRepos } from "@/lib/github";

const fetchRepos = async (params: { key: string; username: string; repo: string }) => {
  const { username } = params;
  return await getUserRepos(username);
};

export default function OwnerPage() {
  const { owner } = useParams<{ owner: string }>();
  const { data, error, isLoading } = useSWRImmutable({ key: "listRepos", username: owner }, fetchRepos);

  return (
    <>
      <Content>
        <Heading as="h2">{`${owner} Repositories`}</Heading>
        {error && (
          <Banner
            aria-label="No respositories found"
            title="Not Respositories Found"
            hideTitle
            description={error.message}
            variant="warning"
          />
        )}
        <RepoGrid isLoading={isLoading} data={data} />
      </Content>
      <Sidebar>
        <SearchBar />
        <BookmarkList />
        <Ads />
      </Sidebar>
    </>
  );
}
