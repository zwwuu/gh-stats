"use client";

import dynamic from "next/dynamic";
import RepoGridSkeleton from "../RepoGrid/RepoGridSkeleton";

type OwnerReposClientProps = {
  owner: string;
};

const OwnerReposClient = dynamic<OwnerReposClientProps>(
  () => import("./OwnerReposClientInner"),
  {
    ssr: false,
    loading: () => <RepoGridSkeleton />,
  },
);

export default OwnerReposClient;
