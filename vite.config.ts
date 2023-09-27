import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

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
    ],
});
