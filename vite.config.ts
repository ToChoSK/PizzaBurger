import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  },
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
