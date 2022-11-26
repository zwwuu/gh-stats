type WindowWithDataLayer = Window & {
  dataLayer: Record<string, any>[];
};

declare const window: WindowWithDataLayer;

export const pageview = (url: URL) => {
  window.dataLayer.push({
    event: "pageview",
    page: url
  });
};
