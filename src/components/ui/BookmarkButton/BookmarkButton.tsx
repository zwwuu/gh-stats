import { BookmarkIcon } from "@primer/octicons-react";
import { IconButton, IconButtonProps } from "@primer/react";
import clsx from "clsx";

import styles from "./BookmarkButton.module.css";

type BookmarkButtonProps = {
  className?: string;
} & Omit<IconButtonProps, "icon" | "aria-label" | "aria-labelledby" | "variant">;

export default function BookmarkButton({ className, ...props }: BookmarkButtonProps) {
  return (
    <IconButton
      className={clsx(styles.bookmarkButton, className)}
      aria-label="Bookmark"
      icon={BookmarkIcon}
      variant={"invisible"}
      {...props}
    />
  );
}
