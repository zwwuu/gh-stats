import { Box, Flex, Heading, Icon, Link, Spinner, Text } from "@chakra-ui/react";
import { RiExternalLinkLine, RiGitBranchLine, RiGitRepositoryLine, RiStarFill } from "react-icons/ri";

const RepoCard = ({ loading, full_name, html_url, description, stargazers_count, language, forks_count }) => {
  return loading ? (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      borderWidth={1}
      p={6}
      borderRadius={"lg"}
      overflow={"hidden"}
    >
      <Spinner size={"xl"} thickness={"4px"} />
    </Box>
  ) : (
    <Box borderWidth={1} p={4} borderRadius={"lg"} overflow={"hidden"}>
      <Heading as={"h2"} size="md">
        <Icon as={RiGitRepositoryLine} mr={2} />
        <Link href={`/${full_name}`}>{full_name}</Link>
      </Heading>
      {description && <Text as={"p"}>{description}</Text>}
      <Flex color={"gray.500"} alignItems={"center"}>
        {language && (
          <Text as={"span"} mr={3}>
            {language}
          </Text>
        )}
        <Text as={"span"} mr={3}>
          <Icon as={RiStarFill} /> {stargazers_count}
        </Text>
        <Text as={"span"} mr={3}>
          <Icon as={RiGitBranchLine} /> {forks_count}
        </Text>
        <Text as={"span"}>
          <Link href={html_url} title={"Open in GitHub"} isExternal>
            <Icon as={RiExternalLinkLine} />
          </Link>
        </Text>
      </Flex>
    </Box>
  );
};

export default RepoCard;
