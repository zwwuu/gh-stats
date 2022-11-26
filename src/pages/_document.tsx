import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/site.webmanifest" rel="manifest" />
        <link color="#228be6" href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#228be6" name="msapplication-TileColor" />
        <meta content="#ffffff" name="theme-color" />
      </Head>
      <body>
      <Main />
      <NextScript />
      <noscript>
        <iframe
          height="0"
          src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          style={{ display: "none", visibility: "hidden" }}
          width="0"
        ></iframe>
      </noscript>
      </body>
    </Html>
  );
}
