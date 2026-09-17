import { Heading } from "@primer/react";
import type { Metadata } from "next";
import { Content, OwnerReposClient, RepoSidebar, Sidebar } from "@/components";

type Props = {
  params: Promise<{ owner: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { owner } = await params;
  const title = `${owner}'s Repositories`;
  const description = `Browse public repositories and release download statistics for ${owner}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${owner}`,
    },
    openGraph: {
      title: `${owner} | GitHub Repositories Analytics`,
      description,
      url: `/${owner}`,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${owner} | GitHub Repositories Analytics`,
      description,
    },
  };
}

export default async function OwnerPage({ params }: Props) {
  const { owner } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${owner}'s GitHub Repositories`,
    description: `Public repositories and download analytics for GitHub user or organization ${owner}.`,
    mainEntity: {
      "@type": "Person",
      name: owner,
      url: `https://github.com/${owner}`,
    },
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
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
