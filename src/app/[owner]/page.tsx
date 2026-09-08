import { Heading } from "@primer/react";
import type { Metadata } from "next";

import { Content, OwnerReposClient, RepoSidebar, Sidebar } from "@/components";

type Props = {
  params: Promise<{ owner: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { owner } = await params;
  return {
    title: `${owner}'s Repositories | GH Stats`,
    description: `Browse public repositories and release statistics for GitHub user/organization ${owner}.`,
    openGraph: {
      title: `${owner} - GitHub Repositories Analytics`,
      description: `Explore public repositories and release statistics for ${owner}`,
    },
  };
}

export default async function OwnerPage({ params }: Props) {
  const { owner } = await params;

  return (
    <>
      <Content>
        <Heading as="h1">{owner}</Heading>
        <OwnerReposClient owner={owner} />
      </Content>
      <Sidebar>
        <RepoSidebar />
      </Sidebar>
    </>
  );
}
