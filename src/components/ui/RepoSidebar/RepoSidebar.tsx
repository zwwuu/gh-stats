import { Stack } from "@primer/react";
import BookmarkList from "@/components/ui/BookmarkList/BookmarkList";
import SearchBar from "@/components/ui/SearchBar/SearchBar";

type RepoSidebarProps = {
  showSearch?: boolean;
};

export default function RepoSidebar({ showSearch = true }: RepoSidebarProps) {
  return (
    <Stack gap="condensed">
      {showSearch ? <SearchBar /> : null}
      <BookmarkList />
    </Stack>
  );
}
