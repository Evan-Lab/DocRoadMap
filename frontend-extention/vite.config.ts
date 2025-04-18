import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './public/manifest.json'
import { resolve } from 'path'
// import { reactRouter } from '@react-router/dev/vite'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
    // reactRouter()
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // newtab: resolve(__dirname, 'newtab.html'),
        content: resolve(__dirname, 'src/content/content.tsx'),
        background: resolve(__dirname, 'public/background.js')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'content' ? 'content.js' : '[name]-[hash].js';
        }
      }
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'tsx',
      },
    },
  }
});
