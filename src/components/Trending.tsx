import {
  Alert,
  AlertIcon,
  Box,
  Container,
  Grid,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import {getTrending, TRENDING_PER_PAGE} from "../lib/github";
import SkeletonCard from "./SkeletonCard";
import RepoCard from "./RepoCard";
import useSWR from "swr";

const fetcher = () => {
    return getTrending().then((res) => res.data);
};

export default function Trending() {
    const {data, error} = useSWR("trending", fetcher, {revalidateOnFocus: false});
    const bg = useColorModeValue("gray.100", "gray.600");

    return (
        <>
            <Box bg={bg} borderBottomWidth={1}>
                <Container maxWidth={"container.xl"} py={12}>
                    <VStack>
                        <Heading as={"h2"}>Trending</Heading>
                        <Text>{"Here's what's popular on GitHub today..."}</Text>
                    </VStack>
                </Container>
            </Box>
            <Container maxWidth={"container.xl"} py={6}>
                {!data && (
                    <Stack spacing={4}>
                        {error && (
                            <Alert status="error" variant="left-accent">
                                <AlertIcon/>
                                {error.message}
                            </Alert>
                        )}
                        <Grid gap={4} templateColumns={{base: "1fr", md: "repeat(2, 1fr)"}}>
                            {[...Array(TRENDING_PER_PAGE)].map((_, index) => (
                                <SkeletonCard key={index}/>
                            ))}
                        </Grid>
                    </Stack>
                )}
                {data && (
                    <Grid gap={4} templateColumns={{base: "1fr", md: "repeat(2, 1fr)"}}>
                        {data.items.map(item =>
                            <RepoCard description={item.description}
                                      forksCount={item.forks_count}
                                      fullName={item.full_name}
                                      htmlUrl={item.html_url}
                                      key={item.id}
                                      language={item.language}
                                      stargazersCount={item.stargazers_count}/>)
                        }
                    </Grid>
                )}
            </Container>
        </>
    );
}
