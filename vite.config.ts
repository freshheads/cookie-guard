import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    lib: {
      entry: [resolve(__dirname, 'src/js/index.ts'), resolve(__dirname, 'src/css/popup.css')],
      name: 'Cookie Guard',
      // the proper extensions will be added
      fileName: 'cookie-guard',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: ['react', 'react-dom'],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          react: 'React'
        }
      }
    }
  },
  plugins: [react()],
})
