import { Metadata } from "next";
import { Heading, Text } from "@primer/react";

import { Anchor, BookmarkList, Content, SearchBar, Sidebar } from "@/components";

export function generateMetadata(): Metadata {
  const title = "About";
  const description = `Learn more about ${process.env.NEXT_PUBLIC_APP_TITLE}.`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: `${title} | ${process.env.NEXT_PUBLIC_APP_TITLE}`,
      description: description,
    },
  };
}

export default function AboutPage() {
  return (
    <>
      <Content>
        <Heading as="h1">About {process.env.NEXT_PUBLIC_APP_TITLE}</Heading>

        <Heading as="h2">Our Mission</Heading>
        <Text as="p">
          {process.env.NEXT_PUBLIC_APP_TITLE} is a powerful, lightweight tool designed for developers, project managers,
          and open-source enthusiasts who want to gain deeper insights into GitHub repositories. Our mission is to make
          repository analytics accessible, intuitive, and actionable for everyone in the open-source community.
        </Text>

        <Heading as="h2">What We Do</Heading>
        <Text as="p">
          We provide real-time statistics, release tracking, and comprehensive insights into any public GitHub
          repository. Whether you&apos;re monitoring your own projects, evaluating dependencies, or exploring new tools,{" "}
          {process.env.NEXT_PUBLIC_APP_TITLE} gives you the data you need at a glance.
        </Text>

        <Heading as="h2">Why Choose {process.env.NEXT_PUBLIC_APP_TITLE}?</Heading>
        <Text as="p">
          Managing and tracking multiple repositories can be challenging. {process.env.NEXT_PUBLIC_APP_TITLE} simplifies
          this by offering a centralized dashboard where you can:
        </Text>
        <ul>
          <li>Track the latest releases and their download statistics</li>
          <li>Understand project trends and community activity</li>
          <li>Bookmark your favorite repositories for quick access</li>
          <li>Discover trending projects in the open-source community</li>
        </ul>

        <Heading as="h2">Key Features</Heading>
        <ul>
          <li>
            <strong>Release Tracking:</strong> Monitor all releases with download counts for each asset
          </li>
          <li>
            <strong>Accurate Data:</strong> All information is fetched directly from the GitHub API for accuracy
          </li>
          <li>
            <strong>Trending Repositories:</strong> Discover popular and trending projects across GitHub
          </li>
          <li>
            <strong>Personal Bookmarks:</strong> Save your favorite repositories for quick access
          </li>
          <li>
            <strong>Dark Mode Support:</strong> Comfortable viewing experience in any lighting condition
          </li>
          <li>
            <strong>Responsive Design:</strong> Works seamlessly on desktop, tablet, and mobile devices
          </li>
          <li>
            <strong>Fast & Lightweight:</strong> Optimized performance with minimal resource usage
          </li>
        </ul>

        <Heading as="h2">How It Works</Heading>
        <Text as="p">
          {process.env.NEXT_PUBLIC_APP_TITLE} leverages the GitHub API to fetch public repository data in real-time.
          Simply enter any GitHub repository URL or owner/repo name, and we&apos;ll instantly display comprehensive
          statistics and insights. No authentication required for public repositories.
        </Text>

        <Heading as="h2">Open Source</Heading>
        <Text as="p">
          {process.env.NEXT_PUBLIC_APP_TITLE} is an open-source project. We believe in transparency and community
          collaboration. You can view our source code, report issues, or contribute to the project on{" "}
          <Anchor href={`${process.env.NEXT_PUBLIC_GITHUB_URL}`} isExternal>
            GitHub
          </Anchor>
          .
        </Text>

        <Heading as="h2">Privacy & Data</Heading>
        <Text as="p">
          We respect your privacy. {process.env.NEXT_PUBLIC_APP_TITLE} does not collect or store personal information.
          All repository data is fetched directly from the GitHub API, and your preferences are stored locally in your
          browser. Read our <Anchor href="/privacy-policy">Privacy Policy</Anchor> for more details.
        </Text>
      </Content>
      <Sidebar>
        <SearchBar />
        <BookmarkList />
      </Sidebar>
    </>
  );
}
