"use client";

import { BookmarkFilledIcon } from "@primer/octicons-react";
import { ActionList, Avatar } from "@primer/react";
import { Blankslate } from "@primer/react/experimental";

import { Anchor } from "@/components";
import { useBookmarks } from "@/contexts";
import blankImg from "@/public/images/blank.png";

export default function BookmarkList() {
  const { bookmarks } = useBookmarks();

  if (bookmarks.length === 0) {
    return (
      <Blankslate border size={"large"}>
        <Blankslate.Visual>
          <BookmarkFilledIcon />
        </Blankslate.Visual>
        <Blankslate.Description>
          You have no bookmarks yet. Start exploring and bookmark your favorite repository!
        </Blankslate.Description>
      </Blankslate>
    );
  }

  return (
    <ActionList showDividers variant="full">
      <ActionList.Heading as="h2">Bookmarks</ActionList.Heading>
      {bookmarks.map((bookmark) => (
        <ActionList.LinkItem size={"large"} key={bookmark.fullName} as={Anchor} href={`/${bookmark.fullName}`}>
          <ActionList.LeadingVisual>
            <Avatar src={bookmark.avatarUrl ?? blankImg.src} />
          </ActionList.LeadingVisual>
          {bookmark.fullName}
          <ActionList.TrailingAction label="Remove bookmark" icon={BookmarkFilledIcon} />
        </ActionList.LinkItem>
      ))}
    </ActionList>
  );
}
