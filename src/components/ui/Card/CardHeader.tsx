import { type ElementType, type HTMLAttributes, type ReactNode } from "react";

import styles from "./Card.module.css";

type CardHeaderProps = {
  children: ReactNode;
  as?: ElementType;
} & HTMLAttributes<HTMLElement>;

export default function Card({ children, as: Component = "header", ...props }: CardHeaderProps) {
  return (
    <Component className={styles.cardHeader} {...props}>
      {children}
    </Component>
  );
}
