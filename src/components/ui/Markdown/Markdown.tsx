import Image from "next/image";
import { Heading, Text } from "@primer/react";
import { Table } from "@primer/react/experimental";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import { Anchor } from "@/components";
import styles from "./Markdown.module.css";

type MarkdownProps = {
  body: string;
};

export default function Markdown({ body }: MarkdownProps) {
  return (
    <div>
      <ReactMarkdown
        components={{
          a(props) {
            const { children, href = "#", title } = props;
            return (
              <Anchor href={href} isExternal={href !== "#"} title={title}>
                {children}
              </Anchor>
            );
          },
          h1(props) {
            const { children } = props;
            return <Heading as="h1">{children}</Heading>;
          },
          h2(props) {
            const { children } = props;
            return <Heading as="h2">{children}</Heading>;
          },
          h3(props) {
            const { children } = props;
            return <Heading as="h3">{children}</Heading>;
          },
          h4(props) {
            const { children } = props;
            return <Heading as="h4">{children}</Heading>;
          },
          h5(props) {
            const { children } = props;
            return <Heading as="h5">{children}</Heading>;
          },
          h6(props) {
            const { children } = props;
            return <Heading as="h6">{children}</Heading>;
          },
          img(props) {
            const { src, alt, width, height } = props;
            return (
              <div className={styles.imgWrapper}>
                {typeof src === "string" && (
                  <Image
                    className={styles.img}
                    src={src}
                    alt={alt ?? ""}
                    width={Number(width)}
                    height={Number(height)}
                  />
                )}
              </div>
            );
          },
          p(props) {
            const { children } = props;
            return <Text as={"p"}>{children}</Text>;
          },
          table(props) {
            const { children } = props;
            return <Table.Container>{children}</Table.Container>;
          },
          th(props) {
            const { children } = props;
            return <Table.Head>{children}</Table.Head>;
          },
          tr(props) {
            const { children } = props;
            return <Table.Row>{children}</Table.Row>;
          },
          td(props) {
            const { children } = props;
            return <Table.Cell>{children}</Table.Cell>;
          },
        }}
        remarkPlugins={[remarkGfm, remarkBreaks]}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
