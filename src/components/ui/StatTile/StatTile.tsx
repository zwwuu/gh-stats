import { type ElementType, type HTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

import commonStyles from "@/components/Common.module.css";
import styles from "./StatTile.module.css";

type StatTileProps = {
  as?: ElementType;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

type StatTileHeadingProps = {
  as?: ElementType;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

type StatTileBodyProps = {
  as?: ElementType;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

type StatTileCaptionProps = {
  as?: ElementType;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

export default function StatTile({ as: Component = "div", children, ...props }: StatTileProps) {
  return (
    <Component className={clsx(commonStyles.rounded, styles.tile)} {...props}>
      {children}
    </Component>
  );
}

export function StatTileHeading({ as: Component = "h3", children, ...props }: StatTileHeadingProps) {
  return (
    <Component className={styles.heading} {...props}>
      {children}
    </Component>
  );
}

export function StatTileBody({ as: Component = "div", children, ...props }: StatTileBodyProps) {
  return (
    <Component className={styles.body} {...props}>
      {children}
    </Component>
  );
}

export function StatTileCaption({ as: Component = "p", children, ...props }: StatTileCaptionProps) {
  return (
    <Component className={styles.caption} {...props}>
      {children}
    </Component>
  );
}
