import { Metadata } from "next";
import { Heading, Text } from "@primer/react";

import { Anchor, BookmarkList, Content, SearchBar, Sidebar } from "@/components";

export function generateMetadata(): Metadata {
  const title = "Terms of Service";
  const description = "Guidelines for using our platform.";

  return {
    title: title,
    description: description,

    openGraph: {
      title: `${title} | ${process.env.NEXT_PUBLIC_APP_TITLE}`,
      description: description,
    },
  };
}

export default function TermsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL;
  const siteName = process.env.NEXT_PUBLIC_APP_TITLE;

  return (
    <>
      <Content>
        <Heading as="h1">Terms of Service</Heading>
        <Text as="p">Last updated: {new Date().toUTCString()}</Text>

        <Heading as="h2">1. Agreement to Terms</Heading>
        <Text as="p">
          By accessing the website at {siteUrl}, you are agreeing to be bound by these terms of service, all applicable
          laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you
          do not agree with any of these terms, you are prohibited from using or accessing this site.
        </Text>

        <Heading as="h2">2. Use License</Heading>
        <Text as="p">
          Permission is granted to temporarily access and use {siteName} for personal, non-commercial purposes only.
          This is the grant of a license, not a transfer of title, and under this license you may not:
        </Text>
        <ul>
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose or for any public display</li>
          <li>Attempt to reverse engineer any software contained on {siteName}&apos;s website</li>
          <li>Remove any copyright or other proprietary notations from the materials</li>
          <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
        </ul>
        <Text as="p">
          This license shall automatically terminate if you violate any of these restrictions and may be terminated by
          {siteName} at any time.
        </Text>

        <Heading as="h2">3. User Responsibilities</Heading>
        <Text as="p">When using our service, you agree to:</Text>
        <ul>
          <li>Provide accurate and complete information</li>
          <li>Use the service in compliance with all applicable laws and regulations</li>
          <li>Not use the service for any unlawful or prohibited purpose</li>
          <li>Not attempt to gain unauthorized access to any portion of the service</li>
          <li>Not interfere with or disrupt the service or servers</li>
          <li>Respect the GitHub API rate limits and terms of service</li>
        </ul>

        <Heading as="h2">4. Intellectual Property</Heading>
        <Text as="p">
          The service and its original content, features, and functionality are owned by {siteName} and are protected by
          international copyright, trademark, patent, trade secret, and other intellectual property laws.
        </Text>
        <Text as="p">
          All GitHub data displayed on this site is sourced from the GitHub API and remains the property of GitHub, Inc.
          and the respective repository owners.
        </Text>

        <Heading as="h2">5. Disclaimer</Heading>
        <Text as="p">
          The materials on {siteName}&apos;s website are provided on an &apos;as is&apos; basis. {siteName} makes no
          warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without
          limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
          non-infringement of intellectual property or other violation of rights.
        </Text>
        <Text as="p">
          {siteName} does not warrant or make any representations concerning the accuracy, likely results, or
          reliability of the use of the materials on its website or otherwise relating to such materials or on any sites
          linked to this site.
        </Text>

        <Heading as="h2">6. Limitations</Heading>
        <Text as="p">
          In no event shall {siteName} or its suppliers be liable for any damages (including, without limitation,
          damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
          use the materials on {siteName}&apos;s website, even if {siteName} or an authorized representative has been
          notified orally or in writing of the possibility of such damage.
        </Text>

        <Heading as="h2">7. Service Availability</Heading>
        <Text as="p">
          We strive to provide uninterrupted access to our service, but we do not guarantee that the service will be
          available at all times. We may experience hardware, software, or other problems or need to perform maintenance
          related to the service, resulting in interruptions, delays, or errors.
        </Text>

        <Heading as="h2">8. Third-Party Links</Heading>
        <Text as="p">
          Our service may contain links to third-party websites or services that are not owned or controlled by
          {siteName}. We have no control over, and assume no responsibility for, the content, privacy policies, or
          practices of any third-party websites or services.
        </Text>

        <Heading as="h2">9. Modifications</Heading>
        <Text as="p">
          {siteName} may revise these terms of service at any time without notice. By using this website you are
          agreeing to be bound by the then current version of these terms of service.
        </Text>

        <Heading as="h2">10. Governing Law</Heading>
        <Text as="p">
          These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in
          which {siteName} operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that
          location.
        </Text>

        <Heading as="h2">Contact Information</Heading>
        <Text as="p">
          If you have any questions about these Terms of Service, please contact us through our{" "}
          <Anchor href="/contact-us">Contact page</Anchor> or via our{" "}
          <Anchor isExternal href={`${process.env.NEXT_PUBLIC_GITHUB_URL}`}>
            GitHub repository
          </Anchor>
          .
        </Text>
      </Content>
      <Sidebar>
        <SearchBar />
        <BookmarkList />
      </Sidebar>
    </>
  );
}
