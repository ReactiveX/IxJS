import gulp from 'gulp';
import size from 'gulp-vinyl-size';
import terser from 'gulp-terser';
import vinylSourceStream from 'vinyl-source-stream';
import vinylBufferStream from 'vinyl-buffer';
import { observableFromStreams, targetDir } from './util.js';
import { memoizeTask } from './memoize-task.js';
import { forkJoin as ObservableForkJoin } from 'rxjs';
import { toArray as observableToArray } from 'rxjs/operators/index.js';
import * as Path from 'node:path';
import { execSync } from 'node:child_process';

import gulpEsbuild from 'gulp-esbuild';
import esbuildAlias from 'esbuild-plugin-alias';

import rollupStream from '@rollup/stream';
import rollupPluginCommonJS from '@rollup/plugin-commonjs';
import rollupPluginNodeResolve from '@rollup/plugin-node-resolve';
import rollupPluginAlias from '@rollup/plugin-alias';

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import webpack from 'webpack-stream';
import vinylNamed from 'vinyl-named';

import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

const bundleDir = Path.resolve(__dirname, '../integration');
const srcDir = Path.join(bundleDir, 'src');
const srcGlob = Path.join(srcDir, '**/*.js');

export function bundleTask(bundler, ...rest) {
    switch (bundler) {
        case 'esbuild': return esbuildTask(...rest);
        case 'rollup': return rollupTask(...rest);
        case 'webpack': return webpackTask(...rest);
    }
}

export const esbuildTask = ((cache) => memoizeTask(cache, function pkgEsbuild(target, format, opts = { minify: true }) {
    const pkgDir = Path.resolve(__dirname, '../', targetDir(target, format));
    const outDir = Path.join(bundleDir, 'esbuild', target, format);
    const aliases = [
        'js',
        'cjs',
        'mjs',
        'ts'
    ].reduce((aliases, ext) => {
        return [
            'Ix',
            'Ix.dom',
            'Ix.node',
            'Ix.iterable',
            'Ix.asynciterable',
            'Ix.iterable.operators',
            'Ix.asynciterable.operators'
        ].reduce((aliases, entrypoint) => ({
            ...aliases,
            [`ix/${entrypoint}.${ext}`]: Path.join(pkgDir, `${entrypoint}.${ext}`)
        }), aliases);
    }, {});
    return observableFromStreams(
        gulp.src(srcGlob),
        gulpEsbuild({
            bundle: true,
            minify: opts.minify,
            treeShaking: true,
            plugins: [
                esbuildAlias(aliases),
            ],
        }),
        gulp.dest(outDir),
        size({ gzip: true })
    );
}))({});

export const rollupTask = ((cache) => memoizeTask(cache, async function pkgRollup(target, format, opts = { minify: true }) {
    const pkgDir = Path.resolve(__dirname, '../', targetDir(target, format));
    const outDir = Path.join(bundleDir, 'rollup', target, format);
    const filePaths = (
        await observableToArray()(
            observableFromStreams(gulp.src(srcGlob))
        ).toPromise())
        .filter(({ path }) => path.endsWith('.js'))
        .map(({ path }) => path.replace(/\.js$/, ''));
    return await ObservableForkJoin(
        filePaths.map((filePath) => observableFromStreams(
            rollupStream({
                input: `${filePath}.js`,
                output: { format: 'cjs' },
                treeshake: true,
                plugins: [
                    rollupPluginAlias({
                        entries: { 'ix': pkgDir }
                    }),
                    rollupPluginNodeResolve(),
                    rollupPluginCommonJS()
                ],
                onwarn: (message) => {
                    if (message.code === 'CIRCULAR_DEPENDENCY') return
                    console.error(message);
                }
            }),
            vinylSourceStream(Path.relative(srcDir, `${filePath}.js`)),
            vinylBufferStream(),
            ...(opts.minify ? [terser()] : []),
            gulp.dest(outDir),
            size({ gzip: true })
        ))
    ).toPromise();
}))({});

export const webpackTask = ((cache) => memoizeTask(cache, function pkgWebpack(target, format, opts = { minify: true, analyze: false }) {
    const pkgDir = Path.resolve(__dirname, '../', targetDir(target, format));
    const outDir = Path.join(bundleDir, 'webpack', target, format);
    return observableFromStreams(
        gulp.src(srcGlob),
        vinylNamed((file) => file.path),
        webpack({
            mode: opts?.minify == false ? 'development' : 'production',
            optimization: {
                usedExports: true
            },
            output: {
                filename: ({ runtime: name }) => Path.relative(srcDir, name)
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
                extensions: ['.mjs', '.cjs', '.js'],
                alias: { 'ix': pkgDir }
            },
            stats: 'errors-only',
            plugins: opts?.analyze ? [new BundleAnalyzerPlugin()] : []
        }),
        gulp.dest(outDir),
        size({ gzip: true })
    );
}))({});

export const execBundleTask = ((cache) => memoizeTask(cache, function execBundle(bundler, target, format) {
    return observableFromStreams(
        gulp.src(Path.join(bundleDir, bundler, target, format, '**', '*.js')),
        async (generator) => {
            for await (const file of generator) {
                console.log(`executing ${file.path}`);
                execSync(`${process.argv[0]} ${file.path}`, { stdio: 'inherit' });
            }
        }
    );
}))({});
