import { getReleases } from "@/lib/github";

type Release = Awaited<ReturnType<typeof getReleases>>[0];

export function useStatChartData(releases: Release[]) {
  const sortedReleases = [...releases]
    .filter((r) => r.published_at)
    .sort((a, b) => new Date(a.published_at!).getTime() - new Date(b.published_at!).getTime());

  const startValue =
    sortedReleases.length > 10 ? (sortedReleases[sortedReleases.length - 10].published_at as string) : undefined;

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
