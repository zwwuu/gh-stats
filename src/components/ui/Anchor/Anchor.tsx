import { cloneElement, ReactElement, ReactNode } from "react";
import Link, { type LinkProps } from "next/link";
import { LinkExternalIcon } from "@primer/octicons-react";
import clsx from "clsx";

import commonStyles from "@/components/Common.module.css";

type AnchorProps = {
  isExternal?: boolean;
  showExternalIcon?: boolean;
  leadingIcon?: ReactElement<{ className?: string }>;
  className?: string;
  children?: ReactNode;
} & LinkProps;

export default function Anchor({
  children,
  className,
  isExternal = false,
  showExternalIcon = true,
  leadingIcon,
  ...props
}: AnchorProps) {
  return (
    <Link
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
    </Link>
  );
}
