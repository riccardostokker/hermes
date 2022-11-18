import {defineConfig} from 'vite';
import {resolve} from 'path';

const configuration =  defineConfig(() => ({
        build: {
            outDir: 'dist',
            lib: {
                entry: resolve(__dirname, 'src/index.ts'),
                fileName: 'index',
                formats: ['es']
            },
            sourcemap: true
        },
        plugins: []
    }));

export default configuration;
