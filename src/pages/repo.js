import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import { RiArrowLeftLine, RiArrowRightLine, RiEyeFill, RiGitBranchLine, RiStarFill } from "react-icons/ri";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import Layout from "../components/layout";
import ReleaseTile from "../components/release-tile";
import Search from "../components/search";
import Seo from "../components/seo";
import { getReleases, getRepo, PER_PAGE } from "../service/github";

const RepoPage = () => {
  let params = useParams();
  let location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get("page"), 10) || 1;
  const user = params.user;
  const repo = params.repo;

  const {
    isLoading: isRepoLoading,
    isError: isRepoError,
    data: repoData,
    error: repoError,
  } = useQuery(["repo", user, repo], () => getRepo(user, repo));
  const {
    isLoading: isReleasesLoading,
    isError: isReleasesError,
    data: releasesData,
    error: releasesError,
  } = useQuery(["release", user, repo, page], () => getReleases(user, repo, page), {
    enabled: !!repoData,
  });

  return (
    <Layout>
      <Seo title={`${user}/${repo}`} />
      {isRepoLoading ? (
        <Box
          maxWidth={"container.xl"}
          mx={"auto"}
          my={12}
          px={4}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <Spinner size={"xl"} thickness={"4px"} />
          <Text mt={6}>Generating stats for {`${user}/${repo}`}</Text>
        </Box>
      ) : isRepoError ? (
        <Box maxWidth={"container.xl"} mx={"auto"} my={12} px={4}>
          <Heading as={"h1"}>Something went wrong!</Heading>
          <Text as={"p"}>{repoError.message}</Text>
          <Search />
        </Box>
      ) : (
        <>
          <Box borderBottomWidth={1} bg={"gray.50"}>
            <Flex
              display={"flex"}
              alignItems={"center"}
              flexDirection={["column", "column", "row"]}
              justifyContent={["center", "center", "space-between"]}
              flexWrap={"wrap"}
              maxWidth={"container.xl"}
              mx={"auto"}
              py={12}
              px={4}
            >
              <Heading as={"h1"} size={"lg"}>
                <Link href={`${repoData.owner.html_url}`} isExternal>
                  {user}
                </Link>
                <Text as={"span"}>{" / "}</Text>
                <Link href={`${repoData.html_url}`} isExternal>
                  {repo}
                </Link>
              </Heading>
              <Flex alignItems={"center"} gap={2} flexWrap={"wrap"}>
                <Tag variant={"outline"} colorScheme="teal" size={"md"}>
                  <TagLeftIcon as={RiEyeFill} />
                  <TagLabel>
                    {"Watch "}
                    <Text as={"span"} fontWeight={"semibold"}>
                      {new Intl.NumberFormat(undefined, { notation: "compact" }).format(repoData.subscribers_count)}
                    </Text>
                  </TagLabel>
                </Tag>
                <Tag variant={"outline"} colorScheme="teal" size={"md"}>
                  <TagLeftIcon as={RiGitBranchLine} />
                  <TagLabel>
                    {"Fork "}
                    <Text as={"span"} fontWeight={"semibold"}>
                      {new Intl.NumberFormat(undefined, { notation: "compact" }).format(repoData.forks_count)}
                    </Text>
                  </TagLabel>
                </Tag>
                <Tag variant={"outline"} colorScheme="teal" size={"md"}>
                  <TagLeftIcon as={RiStarFill} />
                  <TagLabel>
                    {"Star "}
                    <Text as={"span"} fontWeight={"semibold"}>
                      {new Intl.NumberFormat(undefined, { notation: "compact" }).format(repoData.stargazers_count)}
                    </Text>
                  </TagLabel>
                </Tag>
              </Flex>
              {repoData.description && (
                <Text mt={4} mb={0} as="p" flex={"100%"}>
                  {repoData.description}
                </Text>
              )}
            </Flex>
          </Box>
          {isReleasesLoading ? (
            <Flex alignItems={"center"} justifyContent={"center"} maxWidth={"container.xl"} mx={"auto"} my={12} px={4}>
              <Spinner size={"xl"} thickness={"4px"} />
            </Flex>
          ) : isReleasesError ? (
            <Box maxWidth={"container.xl"} mx={"auto"} my={12} px={4}>
              <Alert status="error" borderRadius={"lg"}>
                <AlertIcon />
                {releasesError.message}
              </Alert>
            </Box>
          ) : (
            <Box maxWidth={"container.xl"} mx={"auto"} my={12} px={4}>
              {releasesData.length > 0 ? (
                releasesData.map((release) => <ReleaseTile key={release.id} {...release} />)
              ) : (
                <Alert status="info" borderRadius={"lg"}>
                  <AlertIcon />
                  No releases found
                </Alert>
              )}
              {releasesData.length > 0 && (
                <Flex alignItems={"center"} justifyContent={"center"} gap={4} as={"nav"} aria-label="Pagination">
                  {page > 1 ? (
                    <Link
                      rel="next"
                      href={`/${user}/${repo}/?page=${page - 1}`}
                      aria-label="Previous Page"
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Icon as={RiArrowLeftLine} mr={2} /> Previous
                    </Link>
                  ) : (
                    <Text as={"span"} color={"gray.400"} aria-disabled="true">
                      Previous
                    </Text>
                  )}
                  {releasesData.length === PER_PAGE ? (
                    <Link
                      rel="next"
                      href={`/${user}/${repo}/?page=${page + 1}`}
                      aria-label="Next Page"
                      display={"flex"}
                      alignItems={"center"}
                    >
                      Next <Icon as={RiArrowRightLine} ml={2} />
                    </Link>
                  ) : (
                    <Text as={"span"} color={"gray.400"} aria-disabled="true">
                      Next
                    </Text>
                  )}
                </Flex>
              )}
            </Box>
          )}
        </>
      )}
    </Layout>
  );
};
export default RepoPage;
