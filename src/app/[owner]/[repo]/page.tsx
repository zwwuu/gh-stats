import type { Metadata } from "next";

import { Content, RepoDetailsClient, RepoSidebar, Sidebar } from "@/components";

type Props = {
  params: Promise<{ owner: string; repo: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { owner, repo } = await params;
  return {
    title: `${owner}/${repo} Release Stats & Downloads | GH Stats`,
    description: `Track release download counts, release asset statistics, and release trends for ${owner}/${repo}.`,
    openGraph: {
      title: `${owner}/${repo} - GitHub Release Analytics`,
      description: `View release stats and asset downloads for ${owner}/${repo}`,
    },
  };
}

export default async function RepoPage({ params }: Props) {
  const { owner, repo } = await params;

  return (
    <>
      <Content>
        <RepoDetailsClient owner={owner} repo={repo} />
      </Content>
      <Sidebar>
        <RepoSidebar />
      </Sidebar>
    </>
  );
}
