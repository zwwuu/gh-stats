import { Heading, Text } from "@primer/react";

import { Ads, BookmarkList, Card, CardBody, Content, SearchBar, Sidebar, TrendingGrid } from "@/components";

export default function HomePage() {
  return (
    <>
      <Content>
        <Card>
          <CardBody>
            <Heading as="h1">{process.env.NEXT_PUBLIC_APP_TITLE}</Heading>
            <Text as={"p"}>{process.env.NEXT_PUBLIC_APP_DESCRIPTION}</Text>
            <Text as="p">
              Enter a GitHub repository URL or owner/repo name below to get instant insights into any public project.
              Monitor analyze releases, and stay updated with your favorite project.
            </Text>
            <SearchBar />
          </CardBody>
        </Card>
        <TrendingGrid />
        <Ads />
      </Content>
      <Sidebar>
        <BookmarkList />
        <Ads />
      </Sidebar>
    </>
  );
}
