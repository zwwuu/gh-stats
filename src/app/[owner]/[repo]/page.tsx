import type { Metadata } from "next";
import { Content, RepoDetailsClient, RepoSidebar, Sidebar } from "@/components";

type Props = {
  params: Promise<{ owner: string; repo: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { owner, repo } = await params;
  const title = `${owner}/${repo}`;
  const description = `Track total release download counts, release asset statistics, version history, and trends for GitHub repository ${owner}/${repo}.`;

  return {
    title,
    description,
    keywords: [
      `${owner}/${repo} downloads`,
      `${repo} release stats`,
      `${repo} github downloads`,
      `${owner}/${repo} release assets`,
      "github release statistics",
      "download tracker",
    ],
    alternates: {
      canonical: `/${owner}/${repo}`,
    },
    openGraph: {
      title: `${owner}/${repo} | GitHub Release Analytics & Download Stats`,
      description,
      url: `/${owner}/${repo}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${owner}/${repo} | GitHub Release Analytics & Download Stats`,
      description,
    },
  };
}

export default async function RepoPage({ params }: Props) {
  const { owner, repo } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: `${owner}/${repo}`,
    description: `Track GitHub release download statistics and asset metrics for ${owner}/${repo}.`,
    codeRepository: `https://github.com/${owner}/${repo}`,
    author: {
      "@type": "Person",
      name: owner,
      url: `https://github.com/${owner}`,
    },
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <Content>
        <RepoDetailsClient owner={owner} repo={repo} />
      </Content>
      <Sidebar>
        <RepoSidebar />
      </Sidebar>
    </>
  );
}
