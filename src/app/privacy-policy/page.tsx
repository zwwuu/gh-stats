import { Heading, Text } from "@primer/react";

import { Ads, Anchor, BookmarkList, Content, SearchBar, Sidebar } from "@/components";

export async function generateMetadata() {
  const title = "Privacy Policy";
  const description = "Learn how we handle your data.";
  const url = `/privacy`;

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

export default function PrivacyPage() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL;
  const siteName = process.env.NEXT_PUBLIC_APP_TITLE;

  return (
    <>
      <Content>
        <Heading as="h1">Privacy Policy</Heading>
        <Text as="p">Last updated: {new Date().toLocaleDateString()}</Text>
        <Text as="p">
          At {siteName}, accessible from {siteUrl}, one of our main priorities is the privacy of our visitors. This
          Privacy Policy document contains types of information that is collected and recorded by {siteName} and how we
          use it.
        </Text>

        <Heading as="h2">Information We Collect</Heading>
        <Text as="p">
          We collect several types of information for various purposes to provide and improve our service to you:
        </Text>
        <ul>
          <li>
            <strong>Usage Data:</strong> We may collect information about how you access and use the service, including
            your IP address, browser type, browser version, the pages you visit, the time and date of your visit, and
            other diagnostic data.
          </li>
          <li>
            <strong>GitHub Data:</strong> We fetch publicly available repository information from the GitHub API. This
            data is not stored permanently and is used only to display statistics.
          </li>
          <li>
            <strong>Local Storage:</strong> We use browser local storage to save your preferences, bookmarks, and theme
            settings. This data remains on your device and is not transmitted to our servers.
          </li>
        </ul>

        <Heading as="h2">How We Use Your Information</Heading>
        <Text as="p">We use the collected information for various purposes:</Text>
        <ul>
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our service</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information so that we can improve our service</li>
          <li>To monitor the usage of our service</li>
          <li>To detect, prevent and address technical issues</li>
        </ul>

        <Heading as="h2">Cookies and Web Beacons</Heading>
        <Text as="p">
          Like any other website, {siteName} uses 'cookies'. These cookies are used to store information including
          visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is
          used to optimize the users' experience by customizing our web page content based on visitors' browser type
          and/or other information.
        </Text>
        <Text as="p">
          You can choose to disable cookies through your individual browser options. More detailed information about
          cookie management with specific web browsers can be found at the browsers' respective websites.
        </Text>

        <Heading as="h2">Third-Party Services</Heading>
        <Text as="p">
          Our service may contain links to third-party websites or services that are not owned or controlled by{" "}
          {siteName}. We have no control over, and assume no responsibility for, the content, privacy policies, or
          practices of any third-party websites or services. We strongly advise you to review the Privacy Policy of
          every site you visit.
        </Text>
        <Text as="p">Third-party services we use include:</Text>
        <ul>
          <li>
            <strong>GitHub API:</strong> To fetch public repository data
          </li>
          <li>
            <strong>Google Tag Manager:</strong> For analytics and tracking
          </li>
        </ul>

        <Heading as="h2">Data Retention</Heading>
        <Text as="p">
          We do not store personal data on our servers. All user preferences and bookmarks are stored locally in your
          browser's local storage. GitHub repository data is fetched in real-time from the GitHub API and may be cached
          temporarily for performance purposes.
        </Text>

        <Heading as="h2">Your Rights (GDPR)</Heading>
        <Text as="p">
          If you are a resident of the European Economic Area (EEA), you have certain data protection rights. We aim to
          take reasonable steps to allow you to correct, amend, delete, or limit the use of your personal data.
        </Text>
        <Text as="p">You have the right to:</Text>
        <ul>
          <li>Access, update or delete the information we have on you</li>
          <li>Rectification of your personal data</li>
          <li>Object to processing of your personal data</li>
          <li>Request restriction of processing your personal data</li>
          <li>Request transfer of your personal data</li>
          <li>Withdraw consent</li>
        </ul>

        <Heading as="h2">Children's Privacy</Heading>
        <Text as="p">
          Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable
          information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child
          has provided us with personal data, please contact us.
        </Text>

        <Heading as="h2">Changes to This Privacy Policy</Heading>
        <Text as="p">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
        </Text>
        <Text as="p">
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are
          effective when they are posted on this page.
        </Text>

        <Heading as="h2">Contact Us</Heading>
        <Text as="p">
          If you have any questions about this Privacy Policy, please contact us through our{" "}
          <Anchor href="/contact">Contact page</Anchor> or via our{" "}
          <Anchor href={`${process.env.NEXT_PUBLIC_GITHUB_URL}`} isExternal>
            GitHub repository
          </Anchor>
          .
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
