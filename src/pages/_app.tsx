import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import SEO from "../lib/seo";
import { useEffect } from "react";
import { pageview } from "../lib/gtag";
import { useRouter } from "next/router";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);

  return (
    <>
      <DefaultSeo {...SEO} />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
          (function(w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({
          "gtm.start":
          new Date().getTime(), event: "gtm.js"
        });
          var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : "";
          j.async = true;
          j.src =
          "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, "script", "dataLayer", "${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}");
        `
        }}
        id="google-analytics"
        strategy="afterInteractive"
      />
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}
