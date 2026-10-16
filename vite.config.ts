import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': import.meta.dirname + '/src',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: '3d-runtime',
              test: /node_modules[\\/](three|@react-three|react-reconciler|scheduler)[\\/]/,
              maxSize: 360_000,
              priority: 20,
            },
          ],
        },
      },
    },
  },
})
