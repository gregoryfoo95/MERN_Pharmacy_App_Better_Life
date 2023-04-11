import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://pharmacy-app-front.onrender.com:10000",
    }
  },
  build: {
    minify: true,
    // enable tree shaking
    rollupOptions: {
      treeshake: true,
    },
  },
})