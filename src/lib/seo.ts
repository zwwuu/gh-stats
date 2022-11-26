import { DefaultSeoProps } from "next-seo";

const seo: DefaultSeoProps = {
  defaultTitle: process.env.NEXT_PUBLIC_APP_TITLE,
  titleTemplate: `%s | ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  canonical: process.env.NEXT_PUBLIC_APP_URL,
  robotsProps: {
    maxSnippet: -1,
    maxVideoPreview: -1,
    maxImagePreview: "large"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    site_name: process.env.NEXT_PUBLIC_APP_TITLE,
    url: process.env.NEXT_PUBLIC_APP_URL,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`,
        width: 512,
        height: 512,
        alt: `${process.env.NEXT_PUBLIC_APP_TITLE} logo`
      }
    ]
  },
  twitter: {
    cardType: "summary_large_image"
  }
};

export default seo;
