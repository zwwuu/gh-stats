import clsx from "clsx";
import type React from "react";
import type { VirtuosoHandle } from "react-virtuoso";
import {
  Anchor,
  StatTile,
  StatTileBody,
  StatTileCaption,
  StatTileHeading,
} from "@/components";
import commonStyles from "@/components/Common.module.css";
import type { getReleases } from "@/lib/github";
import { prettyDate, prettyNumber } from "@/lib/pretty-format";
import styles from "../ReleaseList.module.css";

type Release = Awaited<ReturnType<typeof getReleases>>[number];
type ReleaseResult = { release: Release | null; index: number };

type ReleaseStatsProps = {
  releases: Release[];
  filteredReleases: Release[];
  displayedReleases: Release[];
  isFiltered: boolean;
  result: { max: ReleaseResult; min: ReleaseResult };
  virtuosoRef: React.RefObject<VirtuosoHandle | null>;
};

function ReleaseStatTile({
  title,
  result,
  displayedReleases,
  virtuosoRef,
}: {
  title: string;
  result: ReleaseResult;
  displayedReleases: Release[];
  virtuosoRef: React.RefObject<VirtuosoHandle | null>;
}) {
  if (!result.release) {
    return (
      <StatTile>
        <StatTileHeading as="h3">{title}</StatTileHeading>
        <StatTileBody as="p">N/A</StatTileBody>
      </StatTile>
    );
  }

  const { release } = result;
  const scrollToRelease = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const index = displayedReleases.findIndex((item) => item.id === release.id);
    if (index !== -1) virtuosoRef.current?.scrollToIndex(index);
  };

  return (
    <StatTile>
      <StatTileHeading as="h3">{title}</StatTileHeading>
      <StatTileBody as="p">
        {prettyNumber(release.total_download_count, false)}
      </StatTileBody>
      <StatTileCaption as="p">
        in{" "}
        <Anchor href={`#tag-${release.id}`} onClick={scrollToRelease}>
          {release.tag_name}
        </Anchor>
        {" on "}
        {release.published_at ? (
          prettyDate(release.published_at)
        ) : (
          <span className={clsx(commonStyles.textMuted, "italic")}>
            unknown date
          </span>
        )}
      </StatTileCaption>
    </StatTile>
  );
}

export default function ReleaseStats({
  releases,
  filteredReleases,
  displayedReleases,
  isFiltered,
  result,
  virtuosoRef,
}: ReleaseStatsProps) {
  const totalDownloads = filteredReleases.reduce(
    (total, release) => total + release.total_download_count,
    0,
  );
  const averageDownloads = filteredReleases.length
    ? Math.round(totalDownloads / filteredReleases.length)
    : 0;
  const releaseCount = isFiltered
    ? `${filteredReleases.length} of ${releases.length}`
    : `${releases.length}`;

  return (
    <div className={styles.grid}>
      <StatTile>
        <StatTileHeading as="h3">Total Downloads</StatTileHeading>
        <StatTileBody as="p">
          {prettyNumber(totalDownloads, false)}
        </StatTileBody>
        <StatTileCaption as="p">from {releaseCount} releases</StatTileCaption>
      </StatTile>
      <StatTile>
        <StatTileHeading as="h3">Average Downloads Per Release</StatTileHeading>
        <StatTileBody as="p">
          {prettyNumber(averageDownloads, false)}
        </StatTileBody>
        <StatTileCaption as="p">across {releaseCount} releases</StatTileCaption>
      </StatTile>
      <ReleaseStatTile
        displayedReleases={displayedReleases}
        result={result.max}
        title="Most Downloaded Release"
        virtuosoRef={virtuosoRef}
      />
      <ReleaseStatTile
        displayedReleases={displayedReleases}
        result={result.min}
        title="Least Downloaded Release"
        virtuosoRef={virtuosoRef}
      />
    </div>
  );
}
