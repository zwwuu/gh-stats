"use client";

import { GraphIcon } from "@primer/octicons-react";
import { Banner, Stack } from "@primer/react";
import { Blankslate } from "@primer/react/experimental";
import useSWR from "swr";

import { RepoCard } from "@/components";
import { getTrending, TRENDING_PER_PAGE } from "@/lib/github";
import styles from "./TrendingSection.module.css";

const fetchTrending = async () => {
  const res = await getTrending();
  return res.data;
};

export default function TrendingSection() {
  const { data, error } = useSWR("trending", fetchTrending, { revalidateOnFocus: false });

  return (
    <Stack>
      <Blankslate border>
        <Blankslate.Visual>
          <GraphIcon />
        </Blankslate.Visual>
        <Blankslate.Heading>Trending</Blankslate.Heading>
        <Blankslate.Description>Here is what is popular on GitHub today...</Blankslate.Description>
      </Blankslate>
      <div>
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
          {data ? (
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
          ) : (
            <>
              {Array.from({ length: TRENDING_PER_PAGE }, (_, i) => (
                <RepoCard key={i} isLoading />
              ))}
            </>
          )}
        </div>
      </div>
    </Stack>
  );
}
