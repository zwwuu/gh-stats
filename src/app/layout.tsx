import { ReactNode } from "react";
import { Metadata, Viewport } from "next";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { BaseStyles, PageLayout, ThemeProvider } from "@primer/react";

import { FloatingButton, Footer, Navbar } from "@/components";
import { colors } from "@/constants/colors";
import { BookmarkProvider, SettingProvider } from "@/contexts";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    default: `${process.env.NEXT_PUBLIC_APP_TITLE}`,
  },
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: process.env.NEXT_PUBLIC_APP_TITLE,
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noimageindex: false,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: colors.primary,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <link rel={"preconnect"} href={"avatars.githubusercontent.com"} />
      </head>
      <body>
        <ThemeProvider preventSSRMismatch>
          <BaseStyles style={{ backgroundColor: "var(--bgColor-default)", minHeight: "100vh" }}>
            <SettingProvider>
              <BookmarkProvider>
                <PageLayout padding="none" containerWidth="full" columnGap="none" rowGap="none">
                  <Navbar />
                  {children}
                  <FloatingButton />
                </PageLayout>
                <Footer />
              </BookmarkProvider>
            </SettingProvider>
          </BaseStyles>
        </ThemeProvider>
        <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GTM_ID}`} />
      </body>
    </html>
  );
}
