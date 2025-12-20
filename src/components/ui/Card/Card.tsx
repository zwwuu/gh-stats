import { type ElementType, type HTMLAttributes, type ReactNode } from "react";

import styles from "./Card.module.css";

type CardProps = {
  children: ReactNode;
  as?: ElementType;
} & HTMLAttributes<HTMLElement>;

export default function Card({ children, as: Component = "div", ...props }: CardProps) {
  return (
    <Component className={styles.card} {...props}>
      {children}
    </Component>
  );
}
