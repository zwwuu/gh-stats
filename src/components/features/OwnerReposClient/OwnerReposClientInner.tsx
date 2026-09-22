"use client";

import useSWRImmutable from "swr/immutable";
import { RepoGrid } from "@/components";
import { useSettings } from "@/contexts";
import { getUserRepos } from "@/lib/github";

type OwnerReposClientInnerProps = {
  owner: string;
};

export default function OwnerReposClientInner({
  owner,
}: OwnerReposClientInnerProps) {
  const { settings } = useSettings();

  const { data } = useSWRImmutable(
    { key: "listRepos", username: owner, token: settings.githubToken },
    async (params) => getUserRepos(params.username, params.token),
    { suspense: true },
  );

  return <RepoGrid data={data} />;
}
