import type { AppProps, NextWebVitalsMetric } from "next/app";
import Layout from "@/components/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import SEO from "@/lib/seo";
import Script from "next/script";
import { event, GoogleAnalytics } from "nextjs-google-analytics";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <GoogleAnalytics trackPageViews />
      <Script
        src={`//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=${process.env.NEXT_PUBLIC_AMAZON_AD_ID}`}
        async
      />
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  event(metric.name, {
    event_category: metric.label === "web-vital" ? "Web Vitals" : "custom metric",
    value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value), // values must be integers
    event_label: metric.id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  });
}
