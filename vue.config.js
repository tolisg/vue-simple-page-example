/* eslint-disable quotes */
module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'i18n/locales',
      enableInSFC: true
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/variables.scss";'
      }
    }
  }
};
