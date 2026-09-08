import clsx from "clsx";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

import styles from "./StatTile.module.css";

type StatTileProps = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

type StatTileHeadingProps = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

type StatTileBodyProps = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

type StatTileCaptionProps = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export default function StatTile({
  as: Component = "div",
  children,
  className,
  ...props
}: StatTileProps) {
  return (
    <Component className={clsx(styles.tile, className)} {...props}>
      {children}
    </Component>
  );
}

export function StatTileHeading({
  as: Component = "h3",
  children,
  className,
  ...props
}: StatTileHeadingProps) {
  return (
    <Component className={clsx(styles.heading,"my-0", className)} {...props}>
      {children}
    </Component>
  );
}

export function StatTileBody({
  as: Component = "div",
  children,
  className,
  ...props
}: StatTileBodyProps) {
  return (
    <Component className={clsx(styles.body,"my-0", className)} {...props}>
      {children}
    </Component>
  );
}

export function StatTileCaption({
  as: Component = "p",
  children,
  className,
  ...props
}: StatTileCaptionProps) {
  return (
    <Component className={clsx(styles.caption, "my-0",className)} {...props}>
      {children}
    </Component>
  );
}
