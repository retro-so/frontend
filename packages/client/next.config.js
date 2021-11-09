const { withGlobalCss } = require('next-global-css')

const withConfig = withGlobalCss()

/** @type {import('next').NextConfig} */
module.exports = withConfig({
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  redirects: async () => [
    {
      source: '/',
      destination: '/boards',
      permanent: true,
    },
  ],
})
