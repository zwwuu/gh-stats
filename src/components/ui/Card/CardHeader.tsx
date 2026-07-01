import clsx from "clsx";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

import styles from "./Card.module.css";

type CardHeaderProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export default function CardHeader({
  children,
  as: Component = "header",
  className,
  ...props
}: CardHeaderProps) {
  return (
    <Component className={clsx(styles.cardHeader, className)} {...props}>
      {children}
    </Component>
  );
}
