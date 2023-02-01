import { Container, Heading, Text, VStack } from "@chakra-ui/react";
import SearchBar from "@/components/SearchBar";
import Trending from "@/components/Trending";

export default function HomePage() {
  return (
    <>
      <Container maxWidth={"container.xl"} py={6}>
        <VStack align={"start"} spacing={4}>
          <Heading as={"h1"}>{process.env.NEXT_PUBLIC_APP_TITLE}</Heading>
          <Text>{process.env.NEXT_PUBLIC_APP_DESCRIPTION}</Text>
          <SearchBar />
        </VStack>
      </Container>
      <Trending />
    </>
  );
}
