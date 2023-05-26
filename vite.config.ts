import { resolve } from 'path';
import { PluginOption, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
    build: {
        lib: {
            entry: [
                resolve(__dirname, 'src/js/index.ts'),
                resolve(__dirname, 'src/css/popup-styles.css'),
            ],
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
        },
    },
    plugins: [
        react(),
        dts(),
        visualizer({
            template: 'treemap', // or sunburst
            open: true,
            gzipSize: true,
            brotliSize: true,
            filename: 'analyse.html', // will be saved in project's root
        }) as PluginOption,
    ],
});
