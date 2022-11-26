import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Link,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack
} from "@chakra-ui/react";
import Markdown from "./Markdown";
import prettyBytes from "pretty-bytes";

type ReleaseTileProps = {
  htmlUrl: string;
  author: { login: string, avatar_url: string, html_url: string };
  name: string | null;
  prerelease: boolean;
  publishedAt: string | null;
  assets: { id: number, name: string, size: number, download_count: number, created_at: string, browser_download_url: string }[];
  body?: string | null;
  total: number;
}

export default function ReleaseTile({
                                      htmlUrl,
                                      author,
                                      name,
                                      prerelease,
                                      publishedAt,
                                      assets,
                                      body,
                                      total
                                    }: ReleaseTileProps) {
  return (
    <Card variant={"outline"}>
      <CardHeader borderBottomWidth={1}>
        <VStack spacing={2} align={"start"}>
          <Heading as={"h2"} size={"md"}>
            <Link href={htmlUrl} isExternal>
              {name}
            </Link>
          </Heading>
          {prerelease && <Badge ml={2}>Pre-release</Badge>}
          <Link href={author.html_url} isExternal>
            <Avatar src={author.avatar_url} name={author.login} size={"xs"} mr={2} />
            {author.login}
          </Link>
        </VStack>
      </CardHeader>
      <Accordion allowToggle>
        <AccordionItem border={"none"}>
          <AccordionButton>
            <AccordionIcon mr={2} />
            <Heading as={"h3"} size={"sm"}>Changelog</Heading>
          </AccordionButton>
          <AccordionPanel>
            {body && <Markdown body={body} />}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <CardBody borderTopWidth={1}>
        <StatGroup gap={6} textAlign={"center"}>
          {publishedAt &&
            <Stat>
              <StatLabel>Published At</StatLabel>
              <StatNumber>
                {new Date(publishedAt).toLocaleDateString(undefined,
                  { year: "numeric", month: "long", day: "numeric" })}
              </StatNumber>
            </Stat>
          }
          <Stat>
            <StatLabel>Assets</StatLabel>
            <StatNumber>{assets.length}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Downloads</StatLabel>
            <StatNumber>{new Intl.NumberFormat().format(total)}</StatNumber>
          </Stat>
        </StatGroup>
      </CardBody>
      {assets.length > 0 && (
        <TableContainer borderBottomWidth={1}>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th isNumeric>Size</Th>
                <Th isNumeric>Downloads</Th>
              </Tr>
            </Thead>
            <Tbody>
              {assets.map((asset) => (
                <Tr key={asset.id}>
                  <Td>
                    <Link href={asset.browser_download_url}>{asset.name}</Link>
                  </Td>
                  <Td isNumeric>{prettyBytes(asset.size)}</Td>
                  <Td isNumeric>{new Intl.NumberFormat().format(asset.download_count)}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Name</Th>
                <Th isNumeric>Size</Th>
                <Th isNumeric>Downloads</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
};
