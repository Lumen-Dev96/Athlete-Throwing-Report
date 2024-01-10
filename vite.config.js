import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const ThreeExamples = require('import-three-examples')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ...ThreeExamples
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
