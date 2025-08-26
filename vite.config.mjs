/// <reference types="vitest" />

import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import compression from 'vite-plugin-compression2';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'min-bounding-rectangle',
			fileName: (format) =>
				format === 'es' ? `min-bounding-rectangle.${format}.mjs` : `min-bounding-rectangle.${format}.js`,
			formats: ['es', 'umd'],
		},
	},
	plugins: [
		dts({
			insertTypesEntry: true,
			exclude: ['**/*.test.ts', '**/*.spec.ts'],
		}),
		compression({
			algorithms: ['gzip', 'brotliCompress'],
			exclude: [/\.(br)$/, /\.(gz)$/],
		}),
		visualizer({
			filename: 'bundle-visualizer/analysis.html',
			open: false,
			gzipSize: true,
			brotliSize: true,
		}),
	],
	test: {
		environment: 'node',
	},
});
