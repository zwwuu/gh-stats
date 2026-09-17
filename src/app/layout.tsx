import { GoogleTagManager } from "@next/third-parties/google";
import { BaseStyles, PageLayout } from "@primer/react";
import { ThemeProvider } from "@primer/react/next";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { FloatingButton, Footer, Navbar } from "@/components";
import { BookmarkProvider, SettingProvider } from "@/contexts";
import { colors } from "@/lib/constants";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    default: `${process.env.NEXT_PUBLIC_APP_TITLE} | GitHub Release Download Stats & Analytics`,
  },
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
  keywords: [
    "GitHub release stats",
    "GitHub download counter",
    "GitHub release analytics",
    "track GitHub downloads",
    "GitHub repo statistics",
    "GitHub asset downloads",
    "GitHub release tracker",
  ],
  authors: [{ name: "GH Stats" }],
  creator: process.env.NEXT_PUBLIC_APP_TITLE,
  publisher: process.env.NEXT_PUBLIC_APP_TITLE,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${process.env.NEXT_PUBLIC_APP_TITLE} | GitHub Release Download Stats & Analytics`,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: process.env.NEXT_PUBLIC_APP_TITLE,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${process.env.NEXT_PUBLIC_APP_TITLE} | GitHub Release Download Stats & Analytics`,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
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
};

export const viewport: Viewport = {
  themeColor: colors.primary,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://avatars.githubusercontent.com" rel="preconnect" />
        <link href="https://avatars.githubusercontent.com" rel="dns-prefetch" />
      </head>
      <body>
        <ThemeProvider>
          <BaseStyles
            style={{
              backgroundColor: "var(--bgColor-default)",
              minHeight: "100dvh",
            }}
          >
            <SettingProvider>
              <BookmarkProvider>
                <PageLayout
                  columnGap="none"
                  containerWidth="full"
                  padding="none"
                  rowGap="none"
                >
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
