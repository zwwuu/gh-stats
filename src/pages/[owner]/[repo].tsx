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
    useColorModeValue,
    VStack
} from "@chakra-ui/react";
import SearchBar from "../../components/SearchBar";
import {useRouter} from "next/router";
import {getRepo} from "../../lib/github";
import {EyeIcon, GitBranchIcon, StarFillIcon} from "@primer/octicons-react";
import {NextSeo} from "next-seo";
import {useMemo} from "react";
import ReleaseList from "../../components/ReleaseList";
import useSWRImmutable from "swr/immutable";

const fetcher = (params: { owner: string; repo: string; page: number; }) => {
    const {owner, repo} = params;

    return getRepo(owner, repo).then((res) => ({
        repoData: res[0].data,
        releaseData: res[1]
    }));
};

const releaseDownloadData: { [id: number]: number } = {};

const calculateReleaseDownloads = (assets: { download_count: number }[]) => {
    return assets.reduce((accumulator: number, currentValue: any) => {
        return accumulator + currentValue.download_count;
    }, 0);
};

const calculateTotalDownloads = (releases: any[]) => {
    return releases.reduce((accumulator: number, currentValue: any, index) => {
        const releaseDownloads = calculateReleaseDownloads(currentValue.assets);
        releaseDownloadData[releases[index].id] = releaseDownloads;

        return accumulator + releaseDownloads;
    }, 0);
};

export default function RepoPage() {
    const router = useRouter();
    const {isReady} = router;
    const {owner, repo} = router.query;
    const {data, error} = useSWRImmutable(isReady ? {owner, repo} : null, fetcher);
    const bg = useColorModeValue("gray.100", "gray.600");
    const statBg = useColorModeValue("gray.50", "gray.900");
    const separatorColor = useColorModeValue("gray.600", "gray.200");

    const downloadCount = useMemo(() => {
        if (data && data.releaseData.length) {
            return calculateTotalDownloads(data.releaseData);
        }

        return 0;
    }, [data]);

    return (
        <>
            <NextSeo title={`${owner}/${repo}`}/>
            {error && (
                <Container maxWidth={"container.xl"} py={6}>
                    <Stack align={"start"} spacing={4}>
                        <Heading as={"h1"}>Something went wrong!</Heading>
                        <SearchBar/>
                        <Alert status={"error"} variant="left-accent">
                            <AlertIcon/>
                            {error.message}
                        </Alert>
                    </Stack>
                </Container>
            )}
            {!data && !error && (
                <Container maxWidth={"container.xl"} py={6}>
                    <Stack align={"center"} spacing={4}>
                        <Spinner size={"xl"} thickness={"4px"}/>
                        <Text>Generating stats for <Text as={"span"}
                                                         fontWeight="semibold">{`${owner}/${repo}`}</Text></Text>
                    </Stack>
                </Container>
            )}
            {data && (
                <>
                    <Box bg={bg} borderBottomWidth={1}>
                        <Container maxWidth={"container.xl"} py={6}>
                            <VStack align={"start"} spacing={4}>
                                <Flex gap={4} justify={"space-between"} width={"100%"} wrap={"wrap"}>
                                    <Heading as={"h1"} wordBreak={"break-all"}>
                                        <Link href={`${data.repoData.owner.html_url}`} isExternal>
                                            {data.repoData.owner.login}
                                        </Link>
                                        <Text as={"span"} color={separatorColor}>{" / "}</Text>
                                        <Link href={`${data.repoData.html_url}`} isExternal>
                                            {data.repoData.name}
                                        </Link>
                                    </Heading>
                                    <Flex align="center" gap={4} wrap={"wrap"}>
                                        <Tag colorScheme="teal" size={"md"} variant={"outline"}>
                                            <TagLeftIcon as={EyeIcon}/>
                                            <TagLabel>
                                                {"Watch "}
                                                <Text as={"span"} fontWeight={"semibold"}>
                                                    {new Intl.NumberFormat(undefined, {notation: "compact"}).format(
                                                        data.repoData.subscribers_count)}
                                                </Text>
                                            </TagLabel>
                                        </Tag>
                                        <Tag colorScheme="teal" size={"md"} variant={"outline"}>
                                            <TagLeftIcon as={GitBranchIcon}/>
                                            <TagLabel>
                                                {"Fork "}
                                                <Text as={"span"} fontWeight={"semibold"}>
                                                    {new Intl.NumberFormat(undefined, {notation: "compact"}).format(
                                                        data.repoData.forks_count)}
                                                </Text>
                                            </TagLabel>
                                        </Tag>
                                        <Tag colorScheme="teal" size={"md"} variant={"outline"}>
                                            <TagLeftIcon as={StarFillIcon}/>
                                            <TagLabel>
                                                {"Star "}
                                                <Text as={"span"} fontWeight={"semibold"}>
                                                    {new Intl.NumberFormat(undefined, {notation: "compact"}).format(
                                                        data.repoData.stargazers_count)}
                                                </Text>
                                            </TagLabel>
                                        </Tag>
                                    </Flex>
                                </Flex>
                                {data.repoData.description && (
                                    <Text>{data.repoData.description}</Text>
                                )}
                                <Card bgColor={statBg} variant={"outline"} width={"100%"}>
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
                            <ReleaseList assetData={releaseDownloadData} releases={data.releaseData}/>
                        ) : (
                            <Alert status="info" variant="left-accent">
                                <AlertIcon/>
                                No releases found
                            </Alert>
                        )}
                    </Container>
                </>
            )}
        </>
    );
};
