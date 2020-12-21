/* import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import {eslint} from 'rollup-plugin-eslint';
import replace from 'rollup-plugin-replace'; */
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
// import json from 'rollup-plugin-json'
import json from '@rollup/plugin-json'

export default [
	{
		input: 'src/main.ts',
		output: [
			{
				format: 'cjs',
				file: './lib/main.js',
				exports: 'named',
			},
			{
				format: 'esm',
				file: './lib/index.js',
			},
			{
				format: 'umd',
				name: 'bsStore',
				file: './dist/bs-store.min.js',
				exports: 'named',
			},
		],
		plugins: [
			/* resolve(),
      commonjs(),
      eslint({
        exclude: [
          'src/styles/**',
        ]
      }),
      babel({
        exclude: 'node_modules/**',
      }),
      replace({
        exclude: 'node_modules/**',
        ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
      (process.env.NODE_ENV === 'production' && uglify()), */
			resolve(),
			commonjs(),
			json({
				compact: true
      }),
			typescript(),
			process.env.NODE_ENV === 'production' && terser(),
		],
		external: [],
	},
	{
		input: 'src/plugin.ts',
		output: [
			/* {
				format: 'esm',
				file: './lib/lz-string/index.js',
			}, */
			{
				format: 'cjs',
				file: './lz-string/index.js',
				exports: 'named',
			},
			{
				format: 'umd',
				name: 'lzString',
				file: './dist/bs-store-lz-string.min.js',
				exports: 'named',
			}
		],
		plugins: [
			resolve(),
			commonjs(),
			json({
				compact: true
      }),
			typescript(),
			process.env.NODE_ENV === 'production' && terser(),
		],
	},
]
