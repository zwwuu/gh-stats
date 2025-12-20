import { ReactElement } from "react";
import Link, { type LinkProps } from "next/link";
import { Link as PrimerLink, type LinkProps as PrimerLinkProps } from "@primer/react";
import clsx from "clsx";

import styles from "./Anchor.module.css";

type AnchorProps = {
  isExternal?: boolean;
  leadingIcon?: ReactElement;
  className?: string;
} & PrimerLinkProps &
  LinkProps;

export default function Anchor({ children, className, isExternal = false, leadingIcon, ...props }: AnchorProps) {
  return (
    <PrimerLink
      as={Link}
      prefetch={!isExternal}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
      className={clsx(styles.anchor, className)}
      {...props}
    >
      {leadingIcon && <span className={styles.leadingIcon}>{leadingIcon}</span>}
      {children}
    </PrimerLink>
  );
}
