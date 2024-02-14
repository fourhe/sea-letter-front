const mobileKeywords = [
  'Android',
  'iPhone',
  'iPod',
  'iPad',
  'Windows Phone',
  'BlackBerry',
];

export const isMobileUserAgent = (userAgent: string) =>
  mobileKeywords.some(userAgent.includes);
