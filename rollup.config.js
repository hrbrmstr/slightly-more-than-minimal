import urlResolve from 'rollup-plugin-url-resolve';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import copy from 'rollup-plugin-copy';
import terser from '@rollup/plugin-terser';

export default [
	{
		
		input: './main.js',
		
		output: {
			dir: 'build',
			format: 'es'
		},
		
		external: [ 'https://cdn.jsdelivr.net/pyodide/v0.22.1/full/pyodide.mjs' ],

		plugins: [
			urlResolve({
				cacheManager: '.cache',
				minify: true,
			}),
			html({
				input: 'index.html',
				minify: true,
			}),
			terser(),
			copy({
				targets: [
					{ src: 'webr-*', dest: 'build' },
					{ src: 'R.*', dest: 'build' },
					{ src: 'libR*', dest: 'build' }
				]
			})
		]
		
	}
];