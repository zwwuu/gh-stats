"use client";

import { useMemo, useRef, useState } from "react";
import type { VirtuosoHandle } from "react-virtuoso";
import { ReleaseChangelogModal } from "@/components";
import { useSettings } from "@/contexts";
import type { getReleases } from "@/lib/github";
import ReleaseStats from "./ReleaseStats/ReleaseStats";
import ReleaseTimeline from "./ReleaseTimeline/ReleaseTimeline";
import ReleaseToolbar from "./ReleaseToolbar/ReleaseToolbar";

type Release = Awaited<ReturnType<typeof getReleases>>[number];

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
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const { filter } = settings;

  const isFiltered =
    !filter.showDraft || !filter.showPrerelease || !filter.showEmpty;
  const activeFilterCount =
    Number(filter.showEmpty) +
    Number(filter.showPrerelease) +
    Number(filter.showDraft);

  const filteredReleases = useMemo(
    () =>
      releases.filter((release) => {
        if (!filter.showDraft && release.draft) return false;
        if (!filter.showPrerelease && release.prerelease) return false;
        if (!filter.showEmpty && release.assets.length === 0) return false;
        return true;
      }),
    [filter, releases],
  );

  const displayedReleases = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return filteredReleases;

    return filteredReleases.filter(
      (release) =>
        release.name?.toLowerCase().includes(query) ||
        release.tag_name.toLowerCase().includes(query),
    );
  }, [filteredReleases, searchQuery]);

  const result = useMemo(() => {
    if (filteredReleases.length === 0) {
      return {
        max: { release: null, index: -1 },
        min: { release: null, index: -1 },
      };
    }

    return filteredReleases.reduce(
      (stats, release, index) => {
        if (
          release.total_download_count > stats.max.release.total_download_count
        ) {
          stats.max = { release, index };
        }
        if (
          release.total_download_count < stats.min.release.total_download_count
        ) {
          stats.min = { release, index };
        }
        return stats;
      },
      {
        max: { release: filteredReleases[0], index: 0 },
        min: { release: filteredReleases[0], index: 0 },
      },
    );
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
    displayedReleases.forEach((release) => {
      release.assets.forEach((asset) => {
        rows.push([
          release.tag_name,
          release.published_at || "",
          String(release.draft),
          String(release.prerelease),
          String(release.total_download_count),
          asset.name,
          String(asset.size),
          String(asset.download_count),
        ]);
      });
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows
        .map((row) =>
          row.map((value) => `"${value.replace(/"/g, '""')}"`).join(","),
        )
        .join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `${owner || "repo"}-${repo || "stats"}-releases.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const data = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(displayedReleases, null, 2))}`;
    const link = document.createElement("a");
    link.href = data;
    link.download = `${owner || "repo"}-${repo || "stats"}-releases.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <>
      <ReleaseToolbar
        activeFilterCount={activeFilterCount}
        filter={filter}
        isFiltered={isFiltered}
        onExportCSV={handleExportCSV}
        onExportJSON={handleExportJSON}
        onFilterChange={(nextFilter) => saveSettings({ filter: nextFilter })}
        onResetFilters={() =>
          saveSettings({
            filter: { showEmpty: true, showPrerelease: true, showDraft: true },
          })
        }
        onSearchQueryChange={setSearchQuery}
        searchQuery={searchQuery}
      />
      <ReleaseStats
        displayedReleases={displayedReleases}
        filteredReleases={filteredReleases}
        isFiltered={isFiltered}
        releases={releases}
        result={result}
        virtuosoRef={virtuosoRef}
      />
      <ReleaseTimeline
        onSelectRelease={setSelectedRelease}
        releases={displayedReleases}
        virtuosoRef={virtuosoRef}
      />
      <ReleaseChangelogModal
        isOpen={Boolean(selectedRelease)}
        onClose={() => setSelectedRelease(null)}
        release={selectedRelease}
      />
    </>
  );
}
