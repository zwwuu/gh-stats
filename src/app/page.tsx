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
  return (
    <>
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
