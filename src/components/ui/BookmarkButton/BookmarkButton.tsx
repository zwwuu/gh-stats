"use client";

import { BookmarkFillIcon, BookmarkIcon } from "@primer/octicons-react";
import { IconButton, IconButtonProps } from "@primer/react";

import { Bookmark, useBookmarks } from "@/contexts";

type BookmarkButtonProps = {
  className?: string;
  bookmark?: Omit<Bookmark, "bookmarkedAt">;
} & Omit<IconButtonProps, "icon" | "aria-label" | "aria-labelledby" | "variant">;

export default function BookmarkButton({ className, bookmark, ...props }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const bookmarked = bookmark ? isBookmarked(bookmark.fullName) : false;

  const handleClick = () => {
    if (bookmark) {
      toggleBookmark(bookmark);
    }
  };

  return (
    <IconButton
      className={className}
      aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
      icon={bookmarked ? BookmarkFillIcon : BookmarkIcon}
      variant={"invisible"}
      onClick={handleClick}
      {...props}
    />
  );
}
