import {
  Alert,
  AlertIcon,
  Box,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  Link,
  Spinner,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack
} from "@chakra-ui/react";
import SearchBar from "../../components/SearchBar";
import { useRouter } from "next/router";
import { getRepo } from "../../lib/github";
import { EyeIcon, GitBranchIcon, StarFillIcon } from "@primer/octicons-react";
import { NextSeo } from "next-seo";
import useSWR from "swr";
import ReleaseTile from "../../components/ReleaseTile";
import { useMemo } from "react";

const fetcher = (params: { owner: string; repo: string; page: number; }) => {
  const { owner, repo } = params;

  return getRepo(owner, repo).then((res) => ({
    repoData: res[0].data,
    releaseData: res[1]
  }));
};

export default function RepoPage() {
  const router = useRouter();
  const { owner, repo } = router.query;
  const { data, error } = useSWR({ owner, repo }, fetcher, { revalidateOnFocus: false });

  const calculateDownloadCount = (releases: any[]) => {
    return releases.reduce((accumulator: number, currentValue: any) =>
      accumulator + currentValue.assets.reduce((assetsAccumulator: number, current: any) => {
        return assetsAccumulator + current.download_count;
      }, 0), 0);
  };

  const downloadCount = useMemo(() => {
    if (data) {
      return calculateDownloadCount(data.releaseData);
    }

    return 0;
  }, [data]);

  return (
    <>
      <NextSeo title={`${owner}/${repo}`} />
      {error && (
        <Container maxWidth={"container.xl"} py={6}>
          <Stack align={"start"} spacing={4}>
            <Heading as={"h1"}>Something went wrong!</Heading>
            <SearchBar />
            <Alert status={"error"} variant="left-accent">
              <AlertIcon />
              {error.message}
            </Alert>
          </Stack>
        </Container>
      )}
      {!data && (
        <>
          <Container maxWidth={"container.xl"} py={6}>
            <Stack spacing={4} align={"center"}>
              <Spinner size={"xl"} thickness={"4px"} />
              <Text>Generating stats for <Text as={"span"} fontWeight="semibold">{`${owner}/${repo}`}</Text></Text>
            </Stack>
          </Container>
        </>
      )}
      {data && (
        <>
          <Box borderBottomWidth={1} bg={"gray.50"}>
            <Container maxWidth={"container.xl"} py={6}>
              <VStack spacing={4} align={"start"}>
                <Flex justify={"space-between"} width={"100%"} wrap={"wrap"} gap={4}>
                  <Heading as={"h1"}>
                    <Link href={`${data.repoData.owner.html_url}`} isExternal>
                      {data.repoData.owner.login}
                    </Link>
                    <Text as={"span"}>{" / "}</Text>
                    <Link href={`${data.repoData.html_url}`} isExternal>
                      {data.repoData.name}
                    </Link>
                  </Heading>
                  <Flex align="center" gap={4}>
                    <Tag variant={"outline"} colorScheme="teal" size={"md"}>
                      <TagLeftIcon as={EyeIcon} />
                      <TagLabel>
                        {"Watch "}
                        <Text as={"span"} fontWeight={"semibold"}>
                          {new Intl.NumberFormat(undefined, { notation: "compact" }).format(
                            data.repoData.subscribers_count)}
                        </Text>
                      </TagLabel>
                    </Tag>
                    <Tag variant={"outline"} colorScheme="teal" size={"md"}>
                      <TagLeftIcon as={GitBranchIcon} />
                      <TagLabel>
                        {"Fork "}
                        <Text as={"span"} fontWeight={"semibold"}>
                          {new Intl.NumberFormat(undefined, { notation: "compact" }).format(
                            data.repoData.forks_count)}
                        </Text>
                      </TagLabel>
                    </Tag>
                    <Tag variant={"outline"} colorScheme="teal" size={"md"}>
                      <TagLeftIcon as={StarFillIcon} />
                      <TagLabel>
                        {"Star "}
                        <Text as={"span"} fontWeight={"semibold"}>
                          {new Intl.NumberFormat(undefined, { notation: "compact" }).format(
                            data.repoData.stargazers_count)}
                        </Text>
                      </TagLabel>
                    </Tag>
                  </Flex>
                </Flex>
                {data.repoData.description && (
                  <Text>{data.repoData.description}</Text>
                )}
                <Card variant={"outline"} width={"100%"} bgColor={"white"}>
                  <CardBody>
                    <StatGroup gap={4} textAlign={"center"}>
                      <Stat>
                        <StatLabel>Releases</StatLabel>
                        <StatNumber>{data.releaseData.length}</StatNumber>
                      </Stat>
                      <Stat>
                        <StatLabel>Total Downloads</StatLabel>
                        <StatNumber>{new Intl.NumberFormat().format(downloadCount)}</StatNumber>
                      </Stat>
                    </StatGroup>
                  </CardBody>
                </Card>
              </VStack>
            </Container>
          </Box>
          <Container maxWidth={"container.xl"} py={6}>
            {data.releaseData.length ? (
              <Stack spacing={4}>
                {data.releaseData.map(release =>
                  <ReleaseTile key={release.id} assets={release.assets} author={release.author}
                               body={release.body} htmlUrl={release.html_url} name={release.name}
                               prerelease={release.prerelease} publishedAt={release.published_at} />
                )}
              </Stack>
            ) : (
              <Alert status="info" variant="left-accent">
                <AlertIcon />
                No releases found
              </Alert>
            )}
          </Container>
        </>
      )}
    </>
  );
};
