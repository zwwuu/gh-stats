import { RepoCard } from "@/components";
import type { getTrending, getUserRepos } from "@/lib/github";
import styles from "./RepoGrid.module.css";

type RepoGridProps = {
  data: Awaited<ReturnType<typeof getUserRepos | typeof getTrending>>;
};

export default function RepoGrid({ data }: RepoGridProps) {
  return (
    <div className={styles.grid}>
      {data.map((item) => (
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
