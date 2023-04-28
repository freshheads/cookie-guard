import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: [resolve(__dirname, 'src/js/index.ts'), resolve(__dirname, 'src/css/popup-styles.css')],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
  plugins: [react(), dts()],
});
