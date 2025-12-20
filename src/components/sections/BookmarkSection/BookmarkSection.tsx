"use client";

import { BookmarkFilledIcon } from "@primer/octicons-react";
import { Blankslate } from "@primer/react/experimental";

export default function BookmarkSection() {
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
