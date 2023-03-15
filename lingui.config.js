const nextConfig = require('./next.config')

module.exports = {
  locales: nextConfig.i18n.locales,
  sourceLocale: nextConfig.i18n.defaultLocale,
  fallbackLocales: {
    default: nextConfig.i18n.defaultLocale
  },
  extractBabelOptions: {
    presets: ['@babel/preset-react']
  },
  catalogs: [
    {
      path: 'intl/locales/{locale}/texts',
      include: ['pages', 'components'],
      exclude: ['**/node_modules/**']
    }
  ],
  format: 'po'
}
