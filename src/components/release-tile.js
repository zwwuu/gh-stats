import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Badge,
  Box,
  Code,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  ListItem,
  OrderedList,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import filesize from "filesize";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

const ReleaseTile = ({ html_url, author, name, prerelease, published_at, assets, body }) => {
  let totalDownloads = 0;
  for (let i = 0; i < assets.length; i++) {
    totalDownloads += assets[i].download_count;
  }

  return (
    <Box borderWidth={2} borderRadius={"lg"} my={6}>
      <Box p={4} borderBottomWidth={1}>
        <Box display={"flex"} alignItems={"center"}>
          <Heading as={"h2"} size={"md"}>
            <Link href={html_url} isExternal>
              {name}
            </Link>
          </Heading>
          {prerelease && <Badge ml={2}>Pre-release</Badge>}
        </Box>
        <Link href={author.html_url} isExternal>
          <Avatar src={author.avatar_url} name={author.login} size={"xs"} /> {author.login}
        </Link>
        <Accordion allowToggle mt={6}>
          <AccordionItem border={"none"}>
            <AccordionButton>
              <AccordionIcon mr={2} />
              <Heading as={"h3"} mb={0} size={"sm"}>
                Changelog
              </Heading>
            </AccordionButton>
            <AccordionPanel>
              <Flex flexDirection={"column"} gap={2}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  components={{
                    a({ children, href, title }) {
                      return (
                        <Link href={href} title={title} isExternal>
                          {children}
                        </Link>
                      );
                    },
                    blockquote({ children }) {
                      return (
                        <VStack
                          as={"blockquote"}
                          alignItems="flex-start"
                          spacing={2}
                          borderLeftWidth={"0.25em"}
                          px={"1em"}
                          color={"gray.600"}
                        >
                          {children}
                        </VStack>
                      );
                    },
                    code({ inline, children }) {
                      return inline ? (
                        <Code>{children}</Code>
                      ) : (
                        <Box>
                          <Code>{children}</Code>
                        </Box>
                      );
                    },
                    h1({ children }) {
                      return (
                        <Heading as={"h1"} size="2xl">
                          {children}
                        </Heading>
                      );
                    },
                    h2({ children }) {
                      return (
                        <Heading as={"h2"} size="xl">
                          {children}
                        </Heading>
                      );
                    },
                    h3({ children }) {
                      return (
                        <Heading as={"h3"} size="lg">
                          {children}
                        </Heading>
                      );
                    },
                    h4({ children }) {
                      return (
                        <Heading as={"h4"} size="md">
                          {children}
                        </Heading>
                      );
                    },
                    h5({ children }) {
                      return (
                        <Heading as={"h5"} size="sm">
                          {children}
                        </Heading>
                      );
                    },
                    h6({ children }) {
                      return (
                        <Heading as={"h6"} size="xs">
                          {children}
                        </Heading>
                      );
                    },
                    hr() {
                      return <Divider />;
                    },
                    img({ src, title }) {
                      return <Image src={src} alt={title} />;
                    },
                    li({ className, children }) {
                      return className ? (
                        <ListItem listStyleType="none">{children}</ListItem>
                      ) : (
                        <ListItem>{children}</ListItem>
                      );
                    },
                    ol({ children }) {
                      return <OrderedList>{children}</OrderedList>;
                    },
                    p({ children }) {
                      return <Text>{children}</Text>;
                    },
                    table({ children }) {
                      return (
                        <Box overflowX={"auto"}>
                          <Table>{children}</Table>
                        </Box>
                      );
                    },
                    th({ children }) {
                      return <Th>{children}</Th>;
                    },
                    tr({ children }) {
                      return <Tr>{children}</Tr>;
                    },
                    td({ children }) {
                      return <Td>{children}</Td>;
                    },
                    ul({ children }) {
                      return <UnorderedList>{children}</UnorderedList>;
                    },
                  }}
                  children={body}
                />
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <Box p={4}>
        <StatGroup gap={4}>
          <Stat>
            <StatLabel>Published On</StatLabel>
            <StatNumber>
              {new Date(published_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Number of Assets</StatLabel>
            <StatNumber>{assets.length}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Total Downloads</StatLabel>
            <StatNumber>{new Intl.NumberFormat().format(totalDownloads)}</StatNumber>
          </Stat>
        </StatGroup>
      </Box>
      {totalDownloads > 0 && (
        <Box overflowX={"auto"} borderTopWidth={1}>
          <Table variant="striped" colorScheme={"blackAlpha"}>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th isNumeric>Size</Th>
                <Th isNumeric>Download</Th>
                <Th isNumeric>Updated At</Th>
              </Tr>
            </Thead>
            <Tbody>
              {assets.map((asset) => (
                <Tr key={asset.id}>
                  <Td>
                    <Link href={asset.browser_download_url}>{asset.name}</Link>
                  </Td>
                  <Td isNumeric>{filesize(asset.size, { base: 2 })}</Td>
                  <Td isNumeric>{new Intl.NumberFormat().format(asset.download_count)}</Td>
                  <Td isNumeric>{new Date(asset.updated_at).toLocaleString()}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Name</Th>
                <Th isNumeric>Size</Th>
                <Th isNumeric>Download</Th>
                <Th isNumeric>Updated At</Th>
              </Tr>
            </Tfoot>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default ReleaseTile;
