import { Banner } from "@primer/react";

import styles from "./Disclosure.module.css";

export default function Disclosure() {
  return (
    <Banner aria-label="Disclosure" title="Disclosure" hideTitle layout={"compact"} variant="info">
      <Banner.Description className={styles.description}>
        We earn commissions when you shop through the links below.
      </Banner.Description>
    </Banner>
  );
}
