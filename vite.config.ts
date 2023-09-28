import {resolve} from 'path';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';
import compression from "vite-plugin-compression2";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'minimum-bounding-rectangle',
            fileName: (format) => `minimum-bounding-rectangle.${format}.js`,
            formats: ['es', 'umd'],
        },
    },
    plugins: [
        dts({
            insertTypesEntry: true,
        }),
        compression({
            algorithm: 'gzip', exclude: [/\.(br)$ /, /\.(gz)$/]
        }),
        compression({
            algorithm: 'brotliCompress', exclude: [/\.(br)$ /, /\.(gz)$/],
        }),
    ],
});
