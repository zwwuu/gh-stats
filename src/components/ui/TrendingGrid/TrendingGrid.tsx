"use client";

import { GraphIcon } from "@primer/octicons-react";
import { Banner } from "@primer/react";
import { Blankslate } from "@primer/react/experimental";
import useSWRImmutable from "swr";

import { RepoCard } from "@/components";
import { getTrending, TRENDING_PER_PAGE } from "@/lib/github";
import styles from "./TrendingGrid.module.css";

const fetchTrending = async (params: { key: string; isoDate: string }) => {
  const { isoDate } = params;
  const res = await getTrending(isoDate);

  return res.data;
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

      <div className={styles.grid}>
        {isLoading && (
          <>
            {Array.from({ length: TRENDING_PER_PAGE }, (_, i) => (
              <RepoCard key={i} isLoading />
            ))}
          </>
        )}

        {data && (
          <>
            {data.items.map((item) => (
              <RepoCard
                avatarUrl={item.owner?.avatar_url}
                description={item.description}
                forksCount={item.forks_count}
                fullName={item.full_name}
                htmlUrl={item.html_url}
                key={item.id}
                language={item.language}
                stargazersCount={item.stargazers_count}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
