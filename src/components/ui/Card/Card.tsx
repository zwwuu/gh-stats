import clsx from "clsx";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

import commonStyles from "@/components/Common.module.css";
import styles from "./Card.module.css";

type CardProps = {
  children: ReactNode;
  as?: ElementType;
} & HTMLAttributes<HTMLElement>;

export default function Card({
  children,
  as: Component = "div",
  ...props
}: CardProps) {
  return (
    <Component
      className={clsx(commonStyles.border, commonStyles.rounded, styles.card)}
      {...props}
    >
      {children}
    </Component>
  );
}
