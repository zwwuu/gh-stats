import { Alert, AlertIcon, Box, Grid, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import Layout from "../components/layout";
import RepoCard from "../components/repo-card";
import Search from "../components/search";
import Seo from "../components/seo";
import { getTrending } from "../service/github";

const HomePage = () => {
  const { isLoading, isError, data, error } = useQuery("trending", getTrending);

  return (
    <Layout>
      <Seo title={"Home"} />
      <Box maxWidth={"container.xl"} mx={"auto"} my={12} px={4}>
        <Heading as={"h1"}>GH Stats</Heading>
        <Text as={"p"}>Find the download count of GitHub releases</Text>
        <Search />
      </Box>
      <Box my={12} borderBottomWidth={1} bg={"gray.50"}>
        <Box maxWidth={"container.xl"} mx={"auto"} textAlign={"center"} py={12} px={4}>
          <Heading as={"h2"}>Trending</Heading>
          <Text as={"p"} mb={0}>
            Here's what's popular on GitHub today...
          </Text>
        </Box>
      </Box>
      <Box my={12} maxWidth={"container.xl"} mx={"auto"} px={4}>
        {isLoading ? (
          <Grid templateColumns={["1fr", "1fr", "1fr 1fr"]} gap={4}>
            {[...Array(10)].map((_, index) => (
              <RepoCard key={index} loading />
            ))}
          </Grid>
        ) : isError ? (
          <Alert status="error" borderRadius={"lg"}>
            <AlertIcon />
            {error.message}
          </Alert>
        ) : (
          <Grid templateColumns={["1fr", "1fr", "1fr 1fr"]} gap={4}>
            {data.items.map((item) => {
              return <RepoCard key={item.id} {...item} />;
            })}
          </Grid>
        )}
      </Box>
    </Layout>
  );
};

export default HomePage;
