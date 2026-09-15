"use client";

import { MoonIcon, SunIcon } from "@primer/octicons-react";
import { IconButton, useTheme } from "@primer/react";
import { useSettings } from "@/contexts";

export default function ThemeToggleButton() {
  const { toggleTheme } = useSettings();
  const { resolvedColorMode } = useTheme();

  return (
    <IconButton
      aria-label={"Toggle theme"}
      icon={resolvedColorMode === "day" ? SunIcon : MoonIcon}
      onClick={(event) => {
        event.preventDefault();
        toggleTheme();
      }}
    />
  );
}
