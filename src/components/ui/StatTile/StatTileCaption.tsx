import { type ElementType, type HTMLAttributes, type ReactNode } from "react";

import styles from "./StatTile.module.css";

type StatTileCaptionProps = {
  as?: ElementType;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

export default function StatTileCaption({ as: Component = "p", children, ...props }: StatTileCaptionProps) {
  return (
    <Component className={styles.caption} {...props}>
      {children}
    </Component>
  );
}
