import Image from "next/image";

import { Anchor } from "@/components";
import styles from "./Ads.module.css";

type AdsProps = {
  variant: "square" | "rectangle";
};
export default function Ads({ variant = "rectangle" }: AdsProps) {
  const link =
    variant == "rectangle"
      ? `https://www.jdoqocy.com/click-${process.env.NEXT_PUBLIC_CF_ID}-${process.env.NEXT_PUBLIC_CF_PRODUCT_ID_RECTANGLE}`
      : `https://www.jdoqocy.com/click-${process.env.NEXT_PUBLIC_CF_ID}-${process.env.NEXT_PUBLIC_CF_PRODUCT_ID_SQUARE}`;

  return (
    <div className={styles.ads}>
      <Anchor isExternal showExternalIcon={false} href={link} className={styles.link}>
        {variant == "rectangle" ? (
          <Image
            src={`https://www.awltovhc.com/image-${process.env.NEXT_PUBLIC_CF_ID}-${process.env.NEXT_PUBLIC_CF_PRODUCT_ID_RECTANGLE}`}
            width="468"
            height="60"
            alt=""
            className={styles.image}
          />
        ) : (
          <Image
            src={`https://www.awltovhc.com/image-${process.env.NEXT_PUBLIC_CF_ID}-${process.env.NEXT_PUBLIC_CF_PRODUCT_ID_SQUARE}`}
            width="300"
            height="250"
            alt=""
            className={styles.image}
          />
        )}
      </Anchor>
    </div>
  );
}
