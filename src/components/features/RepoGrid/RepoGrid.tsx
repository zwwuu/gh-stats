import { RepoCard } from "@/components";
import {
  type getTrending,
  type getUserRepos,
  TRENDING_PER_PAGE,
} from "@/lib/github";
import styles from "./RepoGrid.module.css";

type RepoGridProps = {
  isLoading: boolean;
  data?: Awaited<ReturnType<typeof getUserRepos | typeof getTrending>>;
};

export default function RepoGrid({ isLoading, data }: RepoGridProps) {
  return (
    <div className={styles.grid}>
      {isLoading &&
        Array.from({ length: TRENDING_PER_PAGE }, (_, i) => {
          const key = `loading-${i}`;
          return <RepoCard isLoading key={key} />;
        })}

      {data?.map((item) => (
        <RepoCard
          avatarUrl={item.owner?.avatar_url}
          description={item.description}
          forksCount={item.forks_count ?? 0}
          fullName={item.full_name}
          htmlUrl={item.html_url}
          key={item.id}
          language={item.language}
          pushedAt={item.pushed_at}
          stargazersCount={item.stargazers_count ?? 0}
        />
      ))}
    </div>
  );
}
