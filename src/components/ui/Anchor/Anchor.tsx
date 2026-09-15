"use client";

import { LinkExternalIcon } from "@primer/octicons-react";
import { Link, type LinkProps } from "@primer/react";
import clsx from "clsx";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { cloneElement, type ReactElement } from "react";
import styles from "./Anchor.module.css";

type AnchorProps = {
  isExternal?: boolean;
  showExternalIcon?: boolean;
  leadingIcon?: ReactElement<{ className?: string }>;
  trailingIcon?: ReactElement<{ className?: string }>;
} & NextLinkProps &
  LinkProps;

export default function Anchor({
  children,
  className,
  isExternal = false,
  showExternalIcon = true,
  leadingIcon,
  trailingIcon,
  ...props
}: AnchorProps) {
  return (
    <Link
      as={NextLink}
      className={className}
      prefetch={!isExternal}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
      {...props}
    >
      {leadingIcon &&
        cloneElement(leadingIcon, {
          className: clsx(styles.leadingIcon),
        })}
      {children}
      {trailingIcon &&
        cloneElement(trailingIcon, {
          className: clsx(styles.trailingIcon),
        })}
      {isExternal && showExternalIcon && (
        <LinkExternalIcon
          className={styles.trailingIcon}
          verticalAlign={"middle"}
        />
      )}
    </Link>
  );
}
