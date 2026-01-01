"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import styles from "./Ads.module.css";

export default function Ads() {
  const pathname = usePathname();
  useEffect(() => {
    const loadAdSense = () => {
      try {
        if (typeof window !== "undefined" && window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (error) {
        console.error("AdSense error:", error);
      }
    };

    const timer = setTimeout(loadAdSense, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className={styles.ads}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
        data-ad-slot={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT}`}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
