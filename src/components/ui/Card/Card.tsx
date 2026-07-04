import clsx from "clsx";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

import styles from "./Card.module.css";

type CardProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export default function Card({
  children,
  as: Component = "div",
  className,
  ...props
}: CardProps) {
  return (
    <Component className={clsx(styles.card, className)} {...props}>
      {children}
    </Component>
  );
}
