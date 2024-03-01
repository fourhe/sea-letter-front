/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://sea-letter-front.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  robotsTxtOptions: {
    includeNonIndexSitemaps: true,
  },
  autoLastmod: true,
};
