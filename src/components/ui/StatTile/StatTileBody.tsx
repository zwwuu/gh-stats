import { type ElementType, type HTMLAttributes, type ReactNode } from "react";

import styles from "./StatTile.module.css";

type StatTileBodyProps = {
  as?: ElementType;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

export default function StatTileBody({ as: Component = "p", children, ...props }: StatTileBodyProps) {
  return (
    <Component className={styles.body} {...props}>
      {children}
    </Component>
  );
}
