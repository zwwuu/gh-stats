"use client";

import useSWRImmutable from "swr/immutable";
import { RepoGrid } from "@/components";
import { useSettings } from "@/contexts";
import { getUserRepos } from "@/lib/github";
import RepoGridSkeleton from "../RepoGrid/RepoGridSkeleton";

type OwnerReposClientProps = {
  owner: string;
};

export default function OwnerReposClient({ owner }: OwnerReposClientProps) {
  const { settings } = useSettings();
  const { data, isLoading } = useSWRImmutable(
    { key: "listRepos", username: owner, token: settings.githubToken },
    async (params) => getUserRepos(params.username, params.token),
  );

  if (isLoading || !data) {
    return <RepoGridSkeleton />;
  }

  return <RepoGrid data={data} />;
}
