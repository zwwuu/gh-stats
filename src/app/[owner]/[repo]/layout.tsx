import { ReactNode } from "react";
import { Metadata } from "next";

type RepoLayoutProps = {
  params: Promise<{ owner: string; repo: string }>;
  children: ReactNode;
};

export async function generateMetadata({ params }: RepoLayoutProps): Promise<Metadata> {
  const { owner, repo } = await params;
  const description = `View detailed download statistics for ${owner}/${repo}.`;
  const url = `/${owner}/${repo}`;

  return {
    title: `${owner}/${repo}`,
    description: description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${owner}/${repo} | ${process.env.NEXT_PUBLIC_APP_TITLE}`,
      description: description,
      url: url,
    },
  };
}

export default function RepoLayout({ children }: RepoLayoutProps) {
  return <>{children}</>;
}
