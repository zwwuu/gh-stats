import { Avatar, Details, Heading, Text } from "@primer/react";

import { Anchor, Markdown } from "@/components/ui";
import { prettyDate, prettyNumber, prettySize } from "@/lib/pretty-format";
import styles from "./ReleaseTile.module.css";

type ReleaseTileProps = {
  htmlUrl: string;
  author: { login: string; avatar_url: string; html_url: string };
  name?: string;
  prerelease: boolean;
  publishedAt?: string;
  assets: {
    id: number;
    name: string;
    size: number;
    download_count: number;
    created_at: string;
    browser_download_url: string;
  }[];
  body?: string;
  total: number;
};

export default function ReleaseTile({
  htmlUrl,
  author,
  name,
  prerelease,
  publishedAt,
  assets,
  body,
  total,
}: ReleaseTileProps) {
  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <div className={styles.cardBodyRow}>
          <Avatar src={author.avatar_url} alt={author.login} />
          <div>
            <Heading as="h2">
              {name}
              {htmlUrl}
            </Heading>
            {prerelease && (
              <Text as="span" style={{ fontSize: "0.85rem" }}>
                Pre-release
              </Text>
            )}
            <div>
              <Anchor href={author.html_url} isExternal>
                {author.login}
              </Anchor>
            </div>
          </div>
        </div>
      </header>
      <Details>
        <summary className={styles.cardBody}>
          <Heading as="h3" style={{ margin: 0 }}>
            Changelog
          </Heading>
        </summary>
        <div className={styles.cardBody}>{body && <Markdown body={body} />}</div>
      </Details>
      <div className={styles.cardFooter}>
        <div className={styles.centerRow}>
          {publishedAt && (
            <div>
              <div>Published At</div>
              <div>{prettyDate(publishedAt)}</div>
            </div>
          )}
          <div>
            <div>Assets</div>
            <div>{assets.length}</div>
          </div>
          <div>
            <div>Downloads</div>
            <div>{prettyNumber(total, false)}</div>
          </div>
        </div>
      </div>
      {assets.length > 0 && (
        <div className={styles.cardFooter}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.tableTh}>Name</th>
                <th className={styles.tableTh} style={{ textAlign: "right" }}>
                  Size
                </th>
                <th className={styles.tableTh} style={{ textAlign: "right" }}>
                  Downloads
                </th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id}>
                  <td className={styles.tableTd}>
                    <a href={asset.browser_download_url}>{asset.name}</a>
                  </td>
                  <td className={`${styles.tableTd} ${styles.tableTdRight}`}>{prettySize(asset.size)}</td>
                  <td className={`${styles.tableTd} ${styles.tableTdRight}`}>
                    {prettyNumber(asset.download_count, false)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th className={styles.tableTh}>Name</th>
                <th className={styles.tableTh} style={{ textAlign: "right" }}>
                  Size
                </th>
                <th className={styles.tableTh} style={{ textAlign: "right" }}>
                  Downloads
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </article>
  );
}
