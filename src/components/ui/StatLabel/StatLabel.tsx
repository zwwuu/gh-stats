import { type ReactNode } from "react";
import { type Icon } from "@primer/octicons-react";
import { Label, type LabelProps } from "@primer/react";

import commonStyles from "@/components/Common.module.css";

type StatLabelProps = {
  children: ReactNode;
  icon?: Icon;
} & LabelProps;

export default function StatLabel({ children, size, icon: IconComponent, ...props }: StatLabelProps) {
  return (
    <Label size={size} {...props}>
      {IconComponent && <IconComponent className={commonStyles.leadingIcon} />}
      {children}
    </Label>
  );
}
