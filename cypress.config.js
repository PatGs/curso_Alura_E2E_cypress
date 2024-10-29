const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    video: true,                // Habilita a gravação de vídeos
  },
});
