import { type ElementType, type HTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

import commonStyles from "@/components/Common.module.css";
import styles from "./StatTile.module.css";

type ReleaseStatListProps = {
  as?: ElementType;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

export default function StatTile({ as: Component = "div", children, ...props }: ReleaseStatListProps) {
  return (
    <Component className={clsx(commonStyles.rounded, styles.tile)} {...props}>
      {children}
    </Component>
  );
}
