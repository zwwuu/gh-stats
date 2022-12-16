import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Icon,
  Link,
  Text,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { GitBranchIcon, LinkExternalIcon, RepoIcon, StarFillIcon } from "@primer/octicons-react";
import NextLink from "next/link";

type RepoCardProps = {
  fullName: string;
  htmlUrl: string;
  description: string | null;
  stargazersCount: number;
  language: string | null;
  forksCount: number;
};
export default function RepoCard({
  fullName,
  htmlUrl,
  description,
  stargazersCount,
  language,
  forksCount,
}: RepoCardProps) {
  const color = useColorModeValue("gray.600", "gray.400");

  return (
    <Card overflow={"hidden"} variant={"outline"}>
      <CardHeader pb={0}>
        <Heading as={"h2"} size="md">
          <Icon as={RepoIcon} mr={2} />
          <NextLink href={`/${fullName}`} legacyBehavior passHref>
            <Link>{fullName}</Link>
          </NextLink>
        </Heading>
      </CardHeader>
      <CardBody>
        <VStack align={"start"}>
          {description && <Text>{description}</Text>}
          <Wrap align="center" color={color} spacing={4}>
            {language && (
              <WrapItem>
                <Text as={"span"}>{language}</Text>
              </WrapItem>
            )}
            <WrapItem>
              <Text as={"span"}>
                <Icon as={StarFillIcon} /> {stargazersCount}
              </Text>
            </WrapItem>
            <WrapItem>
              <Text as={"span"}>
                <Icon as={GitBranchIcon} /> {forksCount}
              </Text>
            </WrapItem>
            <WrapItem>
              <Text as={"span"}>
                <Link href={htmlUrl} isExternal>
                  <Icon as={LinkExternalIcon} mr={2} />
                  Open in GitHub
                </Link>
              </Text>
            </WrapItem>
          </Wrap>
        </VStack>
      </CardBody>
    </Card>
  );
}
