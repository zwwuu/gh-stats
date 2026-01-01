import { type ElementType, type HTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

import styles from "./Card.module.css";

type CardHeaderProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export default function CardHeader({ children, as: Component = "header", className, ...props }: CardHeaderProps) {
  return (
    <Component className={clsx(styles.cardHeader, className)} {...props}>
      {children}
    </Component>
  );
}
