import { Heading, Text } from "@primer/react";

import { Ads, Anchor, BookmarkList, Content, SearchBar, Sidebar } from "@/components";

export async function generateMetadata() {
  const title = "Contact Us";
  const description = "Let's get in touch. We value your feedback and suggestions.";
  const url = `/contact`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${process.env.NEXT_PUBLIC_APP_TITLE}`,
      description: description,
      url: url,
    },
  };
}

export default function ContactPage() {
  return (
    <>
      <Content>
        <Heading as="h1">Contact Us</Heading>
        <Text as="p">Have questions, suggestions, or need support? We&apos;d love to hear from you!</Text>

        <Heading as="h2">Get in Touch</Heading>
        <Text as="p">
          You can reach out to us through the repository URL:{" "}
          <Anchor href={`${process.env.NEXT_PUBLIC_GITHUB_URL}`} isExternal>
            {process.env.NEXT_PUBLIC_GITHUB_URL}
          </Anchor>
          {". "}
          Feel free to report bugs, request features, or contribute to the project.
        </Text>

        <Heading as="h2">How to Report Issues</Heading>
        <Text as="p">When reporting an issue, please include:</Text>
        <ul>
          <li>A clear description of the problem</li>
          <li>Steps to reproduce the issue</li>
          <li>Expected vs actual behavior</li>
          <li>Browser and operating system information</li>
          <li>Screenshots if applicable</li>
        </ul>

        <Heading as="h2">Feature Requests</Heading>
        <Text as="p">
          We welcome feature requests! Please open an issue on our GitHub repository with the &quot;enhancement&quot;
          label. Describe the feature you&apos;d like to see and explain how it would benefit users.
        </Text>
      </Content>
      <Sidebar>
        <SearchBar />
        <BookmarkList />
        <Ads />
      </Sidebar>
    </>
  );
}
