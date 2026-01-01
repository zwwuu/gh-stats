import { cloneElement, ReactElement } from "react";
import Link, { type LinkProps } from "next/link";
import { LinkExternalIcon } from "@primer/octicons-react";
import { Link as PrimerLink, type LinkProps as PrimerLinkProps } from "@primer/react";
import clsx from "clsx";

import commonStyles from "@/components/Common.module.css";

type AnchorProps = {
  isExternal?: boolean;
  showExternalIcon?: boolean;
  leadingIcon?: ReactElement<{ className?: string }>;
  className?: string;
} & PrimerLinkProps &
  LinkProps;

export default function Anchor({
  children,
  className,
  isExternal = false,
  showExternalIcon = true,
  leadingIcon,
  ...props
}: AnchorProps) {
  return (
    <PrimerLink
      as={Link}
      prefetch={!isExternal}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
      className={className}
      {...props}
    >
      {leadingIcon &&
        cloneElement(leadingIcon, {
          className: clsx(commonStyles.leadingIcon, leadingIcon.props.className),
        })}
      {children}
      {isExternal && showExternalIcon && (
        <LinkExternalIcon verticalAlign={"middle"} className={commonStyles.trailingIcon} />
      )}
    </PrimerLink>
  );
}
