import { type ElementType, type HTMLAttributes, type ReactNode } from "react";

import styles from "./StatTile.module.css";

type StatTileHeadingProps = {
  as?: ElementType;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

export default function StatTileHeading({ as: Component = "div", children, ...props }: StatTileHeadingProps) {
  return (
    <Component className={styles.heading} {...props}>
      {children}
    </Component>
  );
}
