import {
  Box,
  Code,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  ListItem,
  OrderedList,
  Table,
  TableContainer,
  Td,
  Text,
  Th,
  Tr,
  UnorderedList,
  VStack
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

type MarkdownProps = {
  body: string
}

export default function Markdown({ body }: MarkdownProps) {
  return (
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
              <TableContainer>
                <Table>{children}</Table>
              </TableContainer>
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
          }
        }}
      >
        {body}
      </ReactMarkdown>
    </Flex>
  );
}
