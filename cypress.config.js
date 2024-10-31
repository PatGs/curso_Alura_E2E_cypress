const { defineConfig } = require('cypress');
//const webpackConfig = require('./cypress/webpack.config');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: true,                // Habilita a gravação de vídeos

  //   setupNodeEvents(on, config) {
  //     on('file:preprocessor', require('@cypress/webpack-preprocessor')({
  //         webpackOptions: webpackConfig,
  //     }));
  // },
  },
});
