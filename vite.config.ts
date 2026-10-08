import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';
import pkg from './package.json' with { type: 'json' };

const externalPackages = [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies),
];

export default defineConfig({
    build: {
        lib: {
            entry: resolve(import.meta.dirname, 'src/js/index.ts'),
            formats: ['es', 'cjs'],
            fileName: 'index',
            // Exported as @freshheads/cookie-guard/dist/style.css; Vite would otherwise name it after fileName.
            cssFileName: 'style',
        },
        rolldownOptions: {
            // Subpaths too: a bundled react/jsx-runtime crashes on a different React major.
            external: (id) =>
                externalPackages.some(
                    (name) => id === name || id.startsWith(`${name}/`)
                ),
            output: {
                // Bundling drops the module-level directive from the source, so add it to the output.
                banner: "'use client';",
            },
        },
    },
    plugins: [
        react(),
        dts({
            // Dev playground only (index.html); not part of the published types.
            exclude: [
                'src/js/main.tsx',
                'src/js/components/App.tsx',
                'src/js/components/NeedsCookies.tsx',
            ],
        }),
        visualizer({
            template: 'treemap', // or sunburst
            open: true,
            gzipSize: true,
            brotliSize: true,
            filename: 'analyse.html', // will be saved in project's root
        }),
    ],
});
