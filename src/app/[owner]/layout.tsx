import { ReactNode } from "react";
import { Metadata } from "next";

type RepoLayoutProps = {
  params: Promise<{ owner: string }>;
  children: ReactNode;
};

export async function generateMetadata({ params }: RepoLayoutProps): Promise<Metadata> {
  const { owner } = await params;
  const description = `View repositories for ${owner}.`;
  const url = `/${owner}`;

  return {
    title: owner,
    description: description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${owner} | ${process.env.NEXT_PUBLIC_APP_TITLE}`,
      description: description,
      url: url,
    },
  };
}

export default function RepoLayout({ children }: RepoLayoutProps) {
  return <>{children}</>;
}
