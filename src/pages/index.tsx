import { Container, Heading, Text, VStack } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import Trending from "../components/Trending";

export default function HomePage() {
  return (
    <>
      <Container maxWidth={"container.xl"} py={6}>
        <VStack align={"start"} spacing={4}>
          <Heading as={"h1"}>GH Stats</Heading>
          <Text>Find the download count of GitHub releases</Text>
          <SearchBar />
        </VStack>
      </Container>
      <Trending />
    </>
  );
}
