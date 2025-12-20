import { Metadata, Viewport } from "next";
import { BaseStyles, PageLayout, ThemeProvider } from "@primer/react";

import { Navbar } from "@/components";
import { colors } from "@/constants/colors";

import "./globals.css";

import { ReactNode } from "react";

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
    <html lang="en" data-light-theme="light" data-dark-theme="dark" data-color-mode="auto">
      <body>
        <ThemeProvider colorMode="auto" preventSSRMismatch>
          <BaseStyles style={{ backgroundColor: "var(--bgColor-default)", minHeight: "100vh" }}>
            <PageLayout padding="none" containerWidth="full" columnGap="none" rowGap="none">
              <Navbar />
              {children}
            </PageLayout>
          </BaseStyles>
        </ThemeProvider>
      </body>
    </html>
  );
}
