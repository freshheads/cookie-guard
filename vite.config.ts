import { resolve } from 'path';
import { PluginOption, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';
import pkg from './package.json';

const externalPackages = [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies),
];

export default defineConfig({
    build: {
        lib: {
            entry: [
                resolve(__dirname, 'src/js/index.ts'),
                resolve(__dirname, 'src/css/popup-styles.css'),
            ],
        },
        rollupOptions: {
            // Subpaths too: a bundled react/jsx-runtime crashes on a different React major.
            external: (id) =>
                externalPackages.some(
                    (name) => id === name || id.startsWith(`${name}/`)
                ),
        },
    },
    plugins: [
        {
            // Bundling and minifying drop module-level directives (also output.banner), so prepend it last.
            name: 'use-client-directive',
            generateBundle(_, bundle) {
                for (const chunk of Object.values(bundle)) {
                    if (chunk.type === 'chunk' && chunk.name === 'index') {
                        chunk.code = `'use client';\n${chunk.code}`;
                    }
                }
            },
        },
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
