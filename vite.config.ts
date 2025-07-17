import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-refresh'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['breez-sdk-liquid-wasm'],
  },
  assetsInclude: ['**/*.wasm'],
  server: {
    headers: {
      '*.wasm': ['Content-Type: application/wasm'],
    },
  },
  worker: {
    format: 'es',
  },
  build: {
    rollupOptions: {
      external: ['breez-sdk-liquid-wasm'],
    },
    target: 'esnext',
  },
  define: {
    global: 'globalThis',
  },
})
