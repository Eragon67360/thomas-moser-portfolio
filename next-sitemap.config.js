/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.thomasmoserdev.com',
    generateRobotsTxt: true,
    exclude: ['/api/*']

  }