"use client";

import dynamic from "next/dynamic";

type RepoDetailsClientProps = {
  owner: string;
  repo: string;
};

const RepoDetailsClient = dynamic<RepoDetailsClientProps>(
  () => import("./RepoDetailsClientInner"),
  {
    ssr: false,
  },
);

export default RepoDetailsClient;
