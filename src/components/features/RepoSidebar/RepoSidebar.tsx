import { Stack } from "@primer/react";
import { BookmarkList, RepoSearchBar } from "@/components";

type RepoSidebarProps = {
  showSearch?: boolean;
};

export default function RepoSidebar({ showSearch = true }: RepoSidebarProps) {
  return (
    <Stack gap="condensed">
      {showSearch ? <RepoSearchBar /> : null}
      <BookmarkList />
    </Stack>
  );
}
