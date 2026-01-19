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
            <SearchBar />
          </CardBody>
        </Card>
        <Ads variant={"rectangle"} />
        <TrendingGrid />
      </Content>
      <Sidebar>
        <BookmarkList />
      </Sidebar>
    </>
  );
}
