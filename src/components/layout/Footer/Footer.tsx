import { Text } from "@primer/react";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <Text as={"p"} className={styles.text}>
        {`© ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_APP_TITLE}`}
      </Text>
    </footer>
  );
}
