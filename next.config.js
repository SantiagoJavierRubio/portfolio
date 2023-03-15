const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es']
  },
  images: {
    domains: ['github.com', 'res.cloudinary.com']
  },
  experimental: {
    swcPlugins: [['@lingui/swc-plugin', {}]]
  }
}

module.exports = nextConfig
