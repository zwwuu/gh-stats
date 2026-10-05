import { RepoCardSkeleton } from "@/components";
import styles from "@/components/features/RepoGrid/RepoGrid.module.css";
import { TRENDING_PER_PAGE } from "@/lib/github";

export default function RepoGridSkeleton() {
  return (
    <div className={styles.grid}>
      {Array.from({ length: TRENDING_PER_PAGE }, (_, i) => {
        // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
        return <RepoCardSkeleton key={i} />;
      })}
    </div>
  );
}
