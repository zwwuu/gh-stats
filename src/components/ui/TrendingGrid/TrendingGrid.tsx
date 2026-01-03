"use client";

import { GraphIcon } from "@primer/octicons-react";
import { Banner } from "@primer/react";
import { Blankslate } from "@primer/react/experimental";
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

export default function TrendingGrid() {
  const { data, error, isLoading } = useSWRImmutable({ key: "trending", isoDate }, fetchTrending);

  return (
    <>
      <Blankslate border>
        <Blankslate.Visual>
          <GraphIcon />
        </Blankslate.Visual>
        <Blankslate.Heading>Trending</Blankslate.Heading>
        <Blankslate.Description>Here is what is popular on GitHub today...</Blankslate.Description>
      </Blankslate>

      {error && (
        <Banner
          aria-label="Error loading trending repositories"
          title="Error"
          hideTitle
          description={error.message}
          variant="critical"
        />
      )}
      <RepoGrid isLoading={isLoading} data={data} />
    </>
  );
}
