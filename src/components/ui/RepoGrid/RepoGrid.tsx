import { RepoCard } from "@/components";
import {
  type getTrending,
  type getUserRepos,
  TRENDING_PER_PAGE,
} from "@/lib/github";

type RepoGridProps = {
  isLoading: boolean;
  data?: Awaited<ReturnType<typeof getUserRepos | typeof getTrending>>;
};

export default function RepoGrid({ isLoading, data }: RepoGridProps) {
  return (
    <div className={'grid grid-cols-1 gap-4 lg:grid-cols-2'}>
      {isLoading &&
        Array.from({ length: TRENDING_PER_PAGE }, (_, i) => {
          const key = `loading-${i}`;
          return <RepoCard key={key} isLoading />;
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
          stargazersCount={item.stargazers_count ?? 0}
          pushedAt={item.pushed_at}
        />
      ))}
    </div>
  );
}
