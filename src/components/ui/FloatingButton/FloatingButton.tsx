"use client";

import { useEffect, useState } from "react";
import { MoveToTopIcon } from "@primer/octicons-react";
import { IconButton } from "@primer/react";
import clsx from "clsx";

import styles from "./FloatingButton.module.css";

export default function FloatingButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <IconButton
      className={clsx(styles.floatingButton, showButton && styles.show)}
      aria-label={"Scroll to top"}
      onClick={(event) => {
        event.preventDefault();
        window.scrollTo(0, 0);
      }}
      tooltipDirection={"n"}
      icon={MoveToTopIcon}
    />
  );
}
