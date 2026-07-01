import { Stack } from "@primer/react";
import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Card.module.css";

type CardBodyProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function CardBody({ children, ...props }: CardBodyProps) {
  return (
    <Stack padding={"normal"} className={styles.cardBody} {...props}>
      {children}
    </Stack>
  );
}
