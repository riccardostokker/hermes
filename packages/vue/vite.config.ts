import {defineConfig} from 'vite';
import {resolve} from 'path';
import {visualizer} from 'rollup-plugin-visualizer';
import vue from '@vitejs/plugin-vue';

const configuration = defineConfig(() => ({
        build: {
            outDir: 'dist',
            lib: {
                entry: resolve(__dirname, 'src/index.ts'),
                fileName: 'index',
                formats: ['es']
            },
            rollupOptions: {
                external: ['vue', 'katex', 'highlight.js'],
                output: {
                    globals: {
                        katex: 'katex',
                        vue: 'Vue'
                    }
                }
            },
            sourcemap: true
        },
        plugins: [
            vue({
                isProduction: false
            }),
            visualizer({
                emitFile: true
            })
        ]
    }));

export default configuration;
