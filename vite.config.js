import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 10000,
    proxy: {
      "/api": `${process.env.BACK_END_URL}`,
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