import gulp from 'gulp';
import size from 'gulp-vinyl-size';
import gulpRename from 'gulp-rename';
import terser from 'gulp-terser';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import { npmPkgName, observableFromStreams } from './util.js';
import { forkJoin as ObservableForkJoin } from 'rxjs';
import { resolve, join } from 'node:path';
import { readdirSync } from 'node:fs';
import { execSync } from 'node:child_process';

import gulpEsbuild from 'gulp-esbuild';
import esbuildAlias from 'esbuild-plugin-alias';

import rollupStream from '@rollup/stream';
import rollupPluginCommonJS from '@rollup/plugin-commonjs';
import rollupPluginNodeResolve from '@rollup/plugin-node-resolve';
import rollupPluginAlias from '@rollup/plugin-alias';

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import webpack from 'webpack-stream';
import named from 'vinyl-named';

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const bundleDir = resolve(__dirname, '../test/bundle');

const fileNames = readdirSync(bundleDir)
    .filter(fileName => fileName.endsWith('.js'))
    .map(fileName => fileName.replace(/\.js$/, ''));

const bundlesGlob = join(bundleDir, '**.js');
const esbuildDir = join(bundleDir, 'esbuild');
export const esbuildTask = (minify = true) => () => observableFromStreams(
    gulp.src(bundlesGlob),
    gulpEsbuild({
        bundle: true,
        minify,
        treeShaking: true,
        plugins: [
            esbuildAlias({
                'ix': resolve(__dirname, `../targets/${npmPkgName}/Ix.dom.mjs`),
                'ix/Ix.iterable.mjs': resolve(__dirname, `../targets/${npmPkgName}/Ix.iterable.mjs`),
                'ix/Ix.asynciterable.mjs': resolve(__dirname, `../targets/${npmPkgName}/Ix.asynciterable.mjs`),
                'ix/Ix.iterable.operators.mjs': resolve(__dirname, `../targets/${npmPkgName}/Ix.iterable.operators.mjs`),
                'ix/Ix.asynciterable.operators.mjs': resolve(__dirname, `../targets/${npmPkgName}/Ix.asynciterable.operators.mjs`),
            }),
        ],
    }),
    gulpRename((p) => { p.basename += '-bundle'; }),
    gulp.dest(esbuildDir),
    size({ gzip: true })
);

const rollupDir = join(bundleDir, 'rollup');
export const rollupTask = (minify = true) => () => ObservableForkJoin(
    fileNames.map(fileName => observableFromStreams(
        rollupStream({
            input: join(bundleDir, `${fileName}.js`),
            output: { format: 'cjs' },
            treeshake: true,
            plugins: [
                rollupPluginAlias({
                    entries: { 'ix': resolve(__dirname, `../targets/${npmPkgName}/`) }
                }),
                rollupPluginNodeResolve()
            ],
            onwarn: (message) => {
                if (message.code === 'CIRCULAR_DEPENDENCY') return
                console.error(message);
            }
        }),
        source(`${fileName}-bundle.js`),
        buffer(),
        ...(minify ? [terser()] : []),
        gulp.dest(rollupDir),
        size({ gzip: true })
    ))
)

const webpackDir = join(bundleDir, 'webpack');
export const webpackTask = (opts = { minify: true, analyze: false }) => () => observableFromStreams(
    gulp.src(bundlesGlob),
    named(),
    webpack({
        mode: opts?.minify == false ? 'development' : 'production',
        optimization: {
            usedExports: true
        },
        output: {
            filename: '[name]-bundle.js'
        },
        module: {
            rules: [
                {
                    resolve: {
                        fullySpecified: false,
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.mjs', '.js'],
            alias: { 'ix': resolve(__dirname, `../targets/${npmPkgName}/`) }
        },
        stats: 'errors-only',
        plugins: opts?.analyze ? [new BundleAnalyzerPlugin()] : []
    }),
    gulp.dest(webpackDir),
    size({ gzip: true })
);

export const execBundleTask = () => () => observableFromStreams(
    gulp.src(join(bundleDir, '**/**-bundle.js')),
    async (generator) => {
        for await (const file of generator) {
            console.log(`executing ${file.path}`);
            execSync(`${process.argv[0]} ${file.path}`, { stdio: 'inherit' });
        }
    }
);
