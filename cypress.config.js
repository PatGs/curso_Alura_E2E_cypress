const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: true,                // Habilita a gravação de vídeos
  },
  env: {
    mobileViewportWidthBreakpoint: 420
  },

  viewportWidth: 1200,
  viewportHeight: 990,
});
