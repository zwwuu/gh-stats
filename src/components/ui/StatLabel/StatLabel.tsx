import { type ReactNode } from "react";
import { type Icon } from "@primer/octicons-react";
import { Label, LabelProps } from "@primer/react";

import styles from "./StatLabel.module.css";

type CardProps = {
  children: ReactNode;
  icon?: Icon;
} & LabelProps;

export default function StatLabel({ children, size, icon: IconComponent, ...props }: CardProps) {
  return (
    <Label size={size} {...props}>
      {IconComponent && <IconComponent className={styles.leadingIcon} />}
      {children}
    </Label>
  );
}
