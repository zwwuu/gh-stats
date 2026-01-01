import prettyBytes from "pretty-bytes";

export function prettyNumber(num: number, compact: boolean = true) {
  const locale = navigator.language;
  const options = compact ? { notation: "compact" as const } : {};
  const formatter = new Intl.NumberFormat(locale, options);

  return formatter.format(num);
}

export function prettySize(num: number) {
  const locale = navigator.language;

  return prettyBytes(num, { locale: locale });
}

export function prettyDate(dateString: string) {
  const date = new Date(dateString);
  const locale = navigator.language;
  const options = { dateStyle: "long" } as const;
  const formatter = new Intl.DateTimeFormat(locale, options);

  return formatter.format(date);
}
