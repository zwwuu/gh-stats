"use client";

import { Banner } from "@primer/react";
import useSWRImmutable from "swr/immutable";

import { RepoGrid } from "@/components";
import { useSettings } from "@/contexts";
import { getUserRepos } from "@/lib/github";

type OwnerReposClientProps = {
  owner: string;
};

export default function OwnerReposClient({ owner }: OwnerReposClientProps) {
  const { settings } = useSettings();

  const { data, error, isLoading } = useSWRImmutable(
    { key: "listRepos", username: owner, token: settings.githubToken },
    async (params) => getUserRepos(params.username, params.token),
  );

  return (
    <>
      {error && (
        <Banner
          aria-label="No repositories found"
          title="No Repositories Found"
          hideTitle
          description={error.message}
          variant="warning"
        />
      )}
      <RepoGrid isLoading={isLoading} data={data} />
    </>
  );
}
