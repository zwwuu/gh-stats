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
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        async
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
  
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');`,
        }}
        id={"analytics"}
      />
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}
