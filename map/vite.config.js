
const { defineConfig } = require('vite');
const reactRefresh = require('@vitejs/plugin-react-refresh');

module.exports = defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
