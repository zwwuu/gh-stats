import { Alert, AlertIcon, Box, Container, Grid, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import { getTrending, TRENDING_PER_PAGE } from "../lib/github";
import RepoCard from "../components/RepoCard";
import SkeletonCard from "../components/SkeletonCard";
import useSWR from "swr";

const fetcher = () => {
  return getTrending().then((res) => res.data);
};

export default function HomePage() {
  const { data, error } = useSWR("trending", fetcher, { revalidateOnFocus: false });

  return (
    <>
      <Container maxWidth={"container.xl"} py={6}>
        <VStack align={"start"} spacing={4}>
          <Heading as={"h1"}>GH Stats</Heading>
          <Text>Find the download count of GitHub releases</Text>
          <SearchBar />
        </VStack>
      </Container>
      <Box borderBottomWidth={1} bg={"gray.50"}>
        <Container maxWidth={"container.xl"} py={12}>
          <VStack>
            <Heading as={"h2"}>Trending</Heading>
            <Text>{"Here's what's popular on GitHub today..."}</Text>
          </VStack>
        </Container>
      </Box>
      <Container py={6} maxWidth={"container.xl"}>
        {!data && (
          <Stack spacing={4}>
            {error && (
              <Alert status="error" variant="left-accent">
                <AlertIcon />
                {error.message}
              </Alert>
            )}
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
              {[...Array(TRENDING_PER_PAGE)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </Grid>
          </Stack>
        )}
        {data && (
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
            {data.items.map(item =>
              <RepoCard key={item.id}
                        fullName={item.full_name}
                        htmlUrl={item.html_url}
                        description={item.description}
                        stargazersCount={item.stargazers_count}
                        language={item.language}
                        forksCount={item.forks_count} />)
            }
          </Grid>
        )}
      </Container>;
    </>
  );
}
