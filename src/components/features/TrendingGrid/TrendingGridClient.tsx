"use client";

import useSWRImmutable from "swr";
import { RepoGrid } from "@/components";
import { getTrending } from "@/lib/github";

const fetchTrending = async (params: { key: string; isoDate: string }) => {
  const { isoDate } = params;
  return await getTrending(isoDate);
};

const isoDate = (() => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - 7);
  date.setUTCHours(0, 0, 0, 0);

  return date.toISOString();
})();

export default function TrendingGridClient() {
  const { data } = useSWRImmutable(
    { key: "trending", isoDate },
    fetchTrending,
    { suspense: true },
  );

  return <RepoGrid data={data} />;
}
