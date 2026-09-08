"use client";

import {
  DownloadIcon,
  FilterIcon,
  FilterRemoveIcon,
  GitCommitIcon,
  SearchIcon,
} from "@primer/octicons-react";
import {
  ActionList,
  ActionMenu,
  Avatar,
  Heading,
  Stack,
  Text,
  TextInput,
  Timeline,
} from "@primer/react";
import { DataTable, Table } from "@primer/react/experimental";
import clsx from "clsx";
import { useMemo, useRef, useState } from "react";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";

import {
  Anchor,
  StatLabel,
  StatTile,
  StatTileBody,
  StatTileCaption,
  StatTileHeading,
} from "@/components";
import commonStyles from "@/components/Common.module.css";
import { useSettings } from "@/contexts";
import type { getReleases } from "@/lib/github";
import { prettyDate, prettyNumber, prettySize } from "@/lib/pretty-format";
import blankImage from "@/public/images/blank.png";
import styles from "./ReleaseList.module.css";

type ReleaseListProps = {
  releases: Awaited<ReturnType<typeof getReleases>>;
  owner?: string;
  repo?: string;
};

export default function ReleaseList({
  releases,
  owner,
  repo,
}: ReleaseListProps) {
  const { settings, saveSettings } = useSettings();
  const [searchQuery, setSearchQuery] = useState("");
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  const isFiltered =
    !settings.filter.showDraft ||
    !settings.filter.showPrerelease ||
    !settings.filter.showEmpty;

  const filteredReleases = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return releases.filter((release) => {
      if (!settings.filter.showDraft && release.draft) return false;
      if (!settings.filter.showPrerelease && release.prerelease) return false;
      if (!settings.filter.showEmpty && release.assets.length === 0)
        return false;
      if (query && !release.tag_name.toLowerCase().includes(query))
        return false;
      return true;
    });
  }, [releases, settings.filter, searchQuery]);

  const { total_downloads, average_downloads, result } = useMemo(() => {
    if (filteredReleases.length === 0) {
      return {
        total_downloads: 0,
        average_downloads: 0,
        result: {
          max: { release: null, index: -1 },
          min: { release: null, index: -1 },
        },
      };
    }

    const total = filteredReleases.reduce(
      (acc, release) => acc + release.total_download_count,
      0,
    );
    const avg = Math.round(total / filteredReleases.length);

    const stats = filteredReleases.reduce(
      (acc, release, index) => {
        if (
          release.total_download_count > acc.max.release.total_download_count
        ) {
          acc.max = { release, index };
        }

        if (
          release.total_download_count < acc.min.release.total_download_count
        ) {
          acc.min = { release, index };
        }

        return acc;
      },
      {
        max: { release: filteredReleases[0], index: 0 },
        min: { release: filteredReleases[0], index: 0 },
      },
    );

    return {
      total_downloads: total,
      average_downloads: avg,
      result: stats,
    };
  }, [filteredReleases]);

  const handleExportCSV = () => {
    const rows = [
      [
        "Release Tag",
        "Published At",
        "Draft",
        "Prerelease",
        "Total Downloads",
        "Asset Name",
        "Asset Size (Bytes)",
        "Asset Downloads",
      ],
    ];
    filteredReleases.forEach((rel) => {
      rel.assets.forEach((ast) => {
        rows.push([
          rel.tag_name,
          rel.published_at || "",
          String(rel.draft),
          String(rel.prerelease),
          String(rel.total_download_count),
          ast.name,
          String(ast.size),
          String(ast.download_count),
        ]);
      });
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows
        .map((e) => e.map((val) => `"${val.replace(/"/g, '""')}"`).join(","))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `${owner || "repo"}-${repo || "stats"}-releases.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(filteredReleases, null, 2))}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute(
      "download",
      `${owner || "repo"}-${repo || "stats"}-releases.json`,
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <>
      <Stack
        align="center"
        wrap="wrap"
        justify="space-between"
        direction="horizontal"
        gap="condensed"
      >
        <Stack align="center" direction="horizontal">
          <TextInput
            leadingVisual={SearchIcon}
            placeholder="Search tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search release tags"
          />
          <ActionMenu>
            <ActionMenu.Button
              leadingVisual={isFiltered ? FilterRemoveIcon : FilterIcon}
            >
              Filters
            </ActionMenu.Button>
            <ActionMenu.Overlay>
              <ActionList
                selectionVariant="multiple"
                role="menu"
                aria-label="Filter"
              >
                <ActionList.Item
                  role="menuitemcheckbox"
                  selected={settings.filter.showEmpty}
                  aria-checked={settings.filter.showEmpty}
                  onSelect={() =>
                    saveSettings({
                      filter: {
                        ...settings.filter,
                        showEmpty: !settings.filter.showEmpty,
                      },
                    })
                  }
                >
                  Show{" "}
                  <Text as={"span"} className={commonStyles.textMuted}>
                    Empty
                  </Text>
                </ActionList.Item>
                <ActionList.Item
                  role="menuitemcheckbox"
                  selected={settings.filter.showPrerelease}
                  aria-checked={settings.filter.showPrerelease}
                  onSelect={() =>
                    saveSettings({
                      filter: {
                        ...settings.filter,
                        showPrerelease: !settings.filter.showPrerelease,
                      },
                    })
                  }
                >
                  Show{" "}
                  <Text as={"span"} className={commonStyles.textAttention}>
                    Prerelease
                  </Text>
                </ActionList.Item>
                <ActionList.Item
                  role="menuitemcheckbox"
                  selected={settings.filter.showDraft}
                  aria-checked={settings.filter.showDraft}
                  onSelect={() =>
                    saveSettings({
                      filter: {
                        ...settings.filter,
                        showDraft: !settings.filter.showDraft,
                      },
                    })
                  }
                >
                  Show{" "}
                  <Text as={"span"} className={commonStyles.textSevere}>
                    Draft
                  </Text>
                </ActionList.Item>
              </ActionList>
            </ActionMenu.Overlay>
          </ActionMenu>
        </Stack>
        <ActionMenu>
          <ActionMenu.Button leadingVisual={DownloadIcon}>
            Export
          </ActionMenu.Button>
          <ActionMenu.Overlay>
            <ActionList>
              <ActionList.Item onSelect={handleExportCSV}>
                Export as CSV
              </ActionList.Item>
              <ActionList.Item onSelect={handleExportJSON}>
                Export as JSON
              </ActionList.Item>
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
      </Stack>

      <div className={styles.grid}>
        <StatTile>
          <StatTileHeading as="h3">Total Downloads</StatTileHeading>
          <StatTileBody as="p">
            {prettyNumber(total_downloads, false)}
          </StatTileBody>
          <StatTileCaption as="p">{`from ${filteredReleases.length} releases`}</StatTileCaption>
        </StatTile>
        <StatTile>
          <StatTileHeading as="h3">
            Average Downloads Per Release
          </StatTileHeading>
          <StatTileBody as="p">
            {prettyNumber(average_downloads, false)}
          </StatTileBody>
        </StatTile>
        <StatTile>
          <StatTileHeading as="h3">Most Downloaded Release</StatTileHeading>
          {result.max.release ? (
            <>
              <StatTileBody as="p">
                {prettyNumber(result.max.release.total_download_count, false)}
              </StatTileBody>
              <StatTileCaption as="p">
                {"in "}
                <Anchor
                  href={`#tag-${result.max.release.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    if (virtuosoRef.current) {
                      const index = releases.findIndex(
                        (r) => r.id === result.max.release?.id,
                      );
                      if (index !== -1) {
                        virtuosoRef.current.scrollToIndex(index);
                      }
                    }
                  }}
                >
                  {result.max.release.tag_name}
                </Anchor>
                {" on "}
                {result.max.release?.published_at ? (
                  prettyDate(result.max.release.published_at)
                ) : (
                  <Text as={"span"} className={styles.deleted}>
                    unknown date
                  </Text>
                )}
              </StatTileCaption>
            </>
          ) : (
            <StatTileBody as="p">N/A</StatTileBody>
          )}
        </StatTile>
        <StatTile>
          <StatTileHeading as="h3">Least Downloaded Release</StatTileHeading>
          {result.min.release ? (
            <>
              <StatTileBody as="p">
                {prettyNumber(result.min.release.total_download_count, false)}
              </StatTileBody>
              <StatTileCaption as="p">
                {"in "}
                <Anchor
                  href={`#tag-${result.min.release.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    if (virtuosoRef.current) {
                      const index = releases.findIndex(
                        (r) => r.id === result.min.release?.id,
                      );
                      if (index !== -1) {
                        virtuosoRef.current.scrollToIndex(index);
                      }
                    }
                  }}
                >
                  {result.min.release.tag_name}
                </Anchor>
                {" on "}
                {result.min.release?.published_at ? (
                  prettyDate(result.min.release.published_at)
                ) : (
                  <Text as={"span"} className={styles.deleted}>
                    unknown date
                  </Text>
                )}
              </StatTileCaption>
            </>
          ) : (
            <StatTileBody as="p">N/A</StatTileBody>
          )}
        </StatTile>
      </div>

      <Timeline clipSidebar>
        <Virtuoso
          increaseViewportBy={500}
          useWindowScroll
          data={filteredReleases}
          ref={virtuosoRef}
          itemContent={(_, release) => {
            return (
              <Timeline.Item key={release.id} id={`tag-${release.id}`}>
                <Timeline.Badge>
                  <GitCommitIcon aria-label="Release" />
                </Timeline.Badge>
                <Timeline.Body className={styles.item}>
                  <Stack gap="condensed">
                    {release.published_at && (
                      <div>{prettyDate(release.published_at)}</div>
                    )}
                    <Stack
                      gap="condensed"
                      direction={"horizontal"}
                      align={"center"}
                    >
                      {release.prerelease && (
                        <StatLabel variant="severe">Pre-release</StatLabel>
                      )}
                      {release.draft && (
                        <StatLabel variant="attention">Draft</StatLabel>
                      )}
                    </Stack>
                    <Heading as="h3">
                      <Anchor href={release.html_url} isExternal>
                        {release.tag_name}
                      </Anchor>
                    </Heading>
                    {release.author ? (
                      <Text as={"span"}>
                        <Stack as={Anchor}
                          href={release.author.html_url}
                          isExternal
                        align="center"
               direction="horizontal"
        gap="none"   className="text-inherit decoration-none hover:decoration-underline"
                          leadingIcon={
                            <Avatar
                              src={release.author.avatar_url}
                              alt={`${release.author.login} avatar`}
                            />
                          }
                        >
                          {release.author.login}
                        </Stack>
                      </Text>
                    ) : (
                      <Text as={"span"} className={styles.deleted}>
                        <Avatar
                          className={commonStyles.leadingIcon}
                          src={blankImage.src}
                          alt={"blank avatar"}
                        />
                        {"Deleted User"}
                      </Text>
                    )}
                    <Stack
                      direction="horizontal"
                      wrap={"wrap"}
                      gap={"condensed"}
                      align="center"
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
                          <StatTileBody as={"p"}>
                            {prettyNumber(release.total_download_count, false)}
                          </StatTileBody>
                        </StatTile>
                      </Stack.Item>
                    </Stack>
                    {release.assets.length > 0 && (
                      <Table.Container>
                        <DataTable
                          cellPadding={"normal"}
                          data={release.assets}
                          columns={[
                            {
                              field: "name",
                              header: "Name",
                              rowHeader: true,
                              sortBy: "alphanumeric",
                              width: "growCollapse",
                              renderCell: (row) => {
                                return (
                                  <Anchor
                                    isExternal
                                    showExternalIcon={false}
                                    href={row.browser_download_url}
                                    className={commonStyles.breakWord}
                                  >
                                    {row.name}
                                  </Anchor>
                                );
                              },
                            },
                            {
                              header: "Size",
                              field: "size",
                              sortBy: "alphanumeric",
                              width: "auto",
                              renderCell: (row) => {
                                return prettySize(row.size);
                              },
                            },
                            {
                              header: "Downloads",
                              field: "download_count",
                              sortBy: "basic",
                              align: "end",
                              width: "auto",
                              renderCell: (row) => {
                                return prettyNumber(row.download_count, false);
                              },
                            },
                          ]}
                        />
                      </Table.Container>
                    )}
                  </Stack>
                </Timeline.Body>
              </Timeline.Item>
            );
          }}
        />
      </Timeline>
    </>
  );
}
