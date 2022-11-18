import {Config} from 'tailwindcss';

const config: Config = {
    content: [
        './node_modules/@hermes-renderer/vue/src/library/theme/**/*',
        './node_modules/@hermes-renderer/book/src/library/theme/**/*',
        './**/*.ts',
        './**/*.vue'
    ],
    theme: {
        extend: {
            fontFamily: {
                'lobster': ['Lobster', 'cursive']
            }
        }
    },
    plugins: []
};

export default config;
