export function prettyNumber(num: number, compact: boolean = true) {
  const locale = navigator.language;
  const options = compact ? { notation: "compact" as const } : undefined;
  const formatter = new Intl.NumberFormat(locale, options);

  return formatter.format(num);
}

export function prettySize(num: number) {
  const locale = navigator.language;
  const formatter = new Intl.NumberFormat(locale, { unit: "byte", style: "unit" });

  return formatter.format(num);
}

export function prettyDate(dateString: string) {
  const date = new Date(dateString);
  const locale = navigator.language;
  const formatter = new Intl.DateTimeFormat(locale);

  return formatter.format(date);
}
