import { Text } from "@primer/react";

import styles from "./Ads.module.css";

export default function Ads() {
  return (
    <div className={styles.ads}>
      <Text as="p">We earn commissions when you shop through the links below</Text>
    </div>
  );
}
