import { Heading, Text } from "@primer/react";
import {
  Card,
  CardBody,
  Content,
  RepoSearchBar,
  RepoSidebar,
  Sidebar,
  TrendingGrid,
} from "@/components";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: process.env.NEXT_PUBLIC_APP_TITLE,
    url: process.env.NEXT_PUBLIC_APP_URL,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL}/{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <Content>
        <Card>
          <CardBody>
            <Heading as="h1">{process.env.NEXT_PUBLIC_APP_TITLE}</Heading>
            <Text as={"p"}>{process.env.NEXT_PUBLIC_APP_DESCRIPTION}</Text>
            <RepoSearchBar />
          </CardBody>
        </Card>
        <TrendingGrid />
      </Content>
      <Sidebar>
        <RepoSidebar showSearch={false} />
      </Sidebar>
    </>
  );
}
