export default function Ads() {
  return <div id={`amzn-assoc-ad-${process.env.NEXT_PUBLIC_AMAZON_AD_ID}`}></div>;
}
