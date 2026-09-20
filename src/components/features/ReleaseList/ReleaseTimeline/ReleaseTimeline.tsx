import { GitCommitIcon, NoteIcon, TagIcon } from "@primer/octicons-react";
import { Avatar, Button, Heading, Stack, Text, Timeline } from "@primer/react";
import { DataTable, Table } from "@primer/react/experimental";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";
import {
  Anchor,
  StatLabel,
  StatTile,
  StatTileBody,
  StatTileHeading,
} from "@/components";
import commonStyles from "@/components/Common.module.css";
import type { getReleases } from "@/lib/github";
import { prettyDate, prettyNumber, prettySize } from "@/lib/pretty-format";
import blankImage from "@/public/images/blank.png";
import styles from "../ReleaseList.module.css";

type Release = Awaited<ReturnType<typeof getReleases>>[number];

type ReleaseTimelineProps = {
  releases: Release[];
  virtuosoRef: React.RefObject<VirtuosoHandle | null>;
  onSelectRelease: (release: Release) => void;
};

export default function ReleaseTimeline({
  releases,
  virtuosoRef,
  onSelectRelease,
}: ReleaseTimelineProps) {
  return (
    <Timeline clipSidebar>
      <Virtuoso
        data={releases}
        increaseViewportBy={500}
        itemContent={(_, release) => (
          <Timeline.Item id={`tag-${release.id}`} key={release.id}>
            <Timeline.Badge>
              <GitCommitIcon aria-label="Release" />
            </Timeline.Badge>
            <Timeline.Body className={styles.timelineBody}>
              <Stack gap="condensed">
                {release.published_at && (
                  <div>{prettyDate(release.published_at)}</div>
                )}
                <Stack align="center" direction="horizontal" gap="condensed">
                  <StatLabel icon={TagIcon}>{release.tag_name}</StatLabel>
                  {release.prerelease && (
                    <StatLabel variant="severe">Pre-release</StatLabel>
                  )}
                  {release.draft && (
                    <StatLabel variant="attention">Draft</StatLabel>
                  )}
                </Stack>
                <Stack
                  align="center"
                  direction="horizontal"
                  justify="space-between"
                  wrap="wrap"
                >
                  <Heading as="h3">
                    <Anchor href={release.html_url} isExternal>
                      {release.name || release.tag_name}
                    </Anchor>
                  </Heading>
                  <Button
                    leadingVisual={NoteIcon}
                    onClick={() => onSelectRelease(release)}
                  >
                    Changelog
                  </Button>
                </Stack>
                {release.author ? (
                  <Text as="span">
                    <Anchor
                      href={`/${release.author.login}`}
                      leadingIcon={
                        <Avatar
                          alt={`${release.author.login} avatar`}
                          src={release.author.avatar_url}
                        />
                      }
                    >
                      {release.author.login}
                    </Anchor>
                  </Text>
                ) : (
                  <Text as="span" className={commonStyles.textMuted}>
                    <Avatar alt="blank avatar" src={blankImage.src} /> Deleted
                    User
                  </Text>
                )}
                <Stack
                  align="center"
                  direction="horizontal"
                  gap="condensed"
                  wrap="wrap"
                >
                  <Stack.Item grow>
                    <StatTile>
                      <StatTileHeading as="h4">Assets</StatTileHeading>
                      <StatTileBody>
                        {prettyNumber(release.assets.length, false)}
                      </StatTileBody>
                    </StatTile>
                  </Stack.Item>
                  <Stack.Item grow>
                    <StatTile>
                      <StatTileHeading>Downloads</StatTileHeading>
                      <StatTileBody as="p">
                        {prettyNumber(release.total_download_count, false)}
                      </StatTileBody>
                    </StatTile>
                  </Stack.Item>
                </Stack>
                {release.assets.length > 0 && (
                  <Table.Container>
                    <DataTable
                      cellPadding="normal"
                      columns={[
                        {
                          field: "name",
                          header: "Name",
                          rowHeader: true,
                          sortBy: "alphanumeric",
                          width: "growCollapse",
                          renderCell: (asset) => (
                            <Anchor
                              className={styles.releaseName}
                              href={asset.browser_download_url}
                              showExternalIcon={false}
                            >
                              {asset.name}
                            </Anchor>
                          ),
                        },
                        {
                          field: "size",
                          header: "Size",
                          sortBy: "alphanumeric",
                          width: "growCollapse",
                          renderCell: (asset) => prettySize(asset.size),
                        },
                        {
                          align: "end",
                          field: "download_count",
                          header: "Downloads",
                          sortBy: "basic",
                          width: "growCollapse",
                          renderCell: (asset) =>
                            prettyNumber(asset.download_count, false),
                        },
                      ]}
                      data={release.assets}
                    />
                  </Table.Container>
                )}
              </Stack>
            </Timeline.Body>
          </Timeline.Item>
        )}
        ref={virtuosoRef}
        useWindowScroll
      />
    </Timeline>
  );
}
