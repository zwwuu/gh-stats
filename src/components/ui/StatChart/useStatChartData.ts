type Release = {
  id: number;
  tag_name: string;
  draft: boolean;
  prerelease: boolean;
  published_at: string | null;
  total_download_count: number;
};

type ReleaseWithPublishedAt = Release & { published_at: string };

export function useStatChartData(releases: Release[]) {
  const sortedReleases = [...releases]
    .filter(
      (r): r is ReleaseWithPublishedAt => typeof r.published_at === "string",
    )
    .sort(
      (a, b) =>
        new Date(a.published_at).getTime() - new Date(b.published_at).getTime(),
    );

  const startValue =
    sortedReleases.length > 10
      ? sortedReleases[sortedReleases.length - 10].published_at
      : undefined;

  const maxRelease = sortedReleases.reduce(
    (max, r) => (r.total_download_count > max.total_download_count ? r : max),
    sortedReleases[0],
  );
  const minRelease = sortedReleases.reduce(
    (min, r) => (r.total_download_count < min.total_download_count ? r : min),
    sortedReleases[0],
  );

  return {
    sortedReleases,
    startValue,
    maxRelease,
    minRelease,
  };
}
