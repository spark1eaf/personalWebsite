import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/' : '/site',  plugins: [react()],
  define: {
    'process.env': process.env
  },
  server: {
    host: 'site.localhost',
    port: 5173,
  }
})
