import { metadataFiles, packageJSONFields, npmPkgName, npmOrgName, targetDir, packageName, observableFromStreams } from './util.js';

import gulp from 'gulp';
import { memoizeTask } from './memoize-task.js';
import { ReplaySubject, EMPTY as ObservableEmpty, forkJoin as ObservableForkJoin } from 'rxjs';
import { share } from 'rxjs/operators/index.js';
import gulpJsonTransform from 'gulp-json-transform';

export const packageTask = ((cache) => memoizeTask(cache, function bundle(target, format) {
    if (target === `src`) return ObservableEmpty();
    const out = targetDir(target, format);
    const jsonTransform = gulpJsonTransform(target === npmPkgName ? createMainPackageJson(target, format) :
        target === `ts` ? createTypeScriptPackageJson(target, format)
            : createScopedPackageJSON(target, format),
        2);
    return ObservableForkJoin([
        observableFromStreams(gulp.src(metadataFiles), gulp.dest(out)), // copy metadata files
        observableFromStreams(gulp.src(`package.json`), jsonTransform, gulp.dest(out)) // write packageJSONs
    ]).pipe(share({ connector: () => new ReplaySubject(), resetOnError: false, resetOnComplete: false, resetOnRefCountZero: false }));
}))({});

export default packageTask;

const createMainPackageJson = (target, format) => (orig) => ({
    ...createTypeScriptPackageJson(target, format)(orig),
    bin: orig.bin,
    name: npmPkgName,
    type: 'commonjs',
    main: `node.js`,
    module: `node.mjs`,
    types: `node.d.ts`,
    unpkg: `dom.es2015.min.js`,
    jsdelivr: `dom.es2015.min.js`,
    browser: {
        [`./node.js`]: `./dom.js`,
        [`./node.mjs`]: `./dom.mjs`
    },
    exports: {
        './package.json': './package.json',
        './Ix.asynciterable.operators': createDualExport(`asynciterable/operators`),
        './Ix.iterable.operators': createDualExport(`iterable/operators`),
        './Ix.asynciterable': createDualExport(`asynciterable`),
        './Ix.iterable': createDualExport(`iterable`),
        './Ix.node': createDualExport(`node`),
        './Ix.dom': createDualExport(`dom`),
        '.': {
            node: createDualExport(`node`),
            ...createDualExport(`dom`),
        },
        './*': createDualExport('*'),
    },
    sideEffects: false,
    esm: { mode: `all`, sourceMap: true }
});

const createTypeScriptPackageJson = (target, format) => (orig) => ({
    ...createScopedPackageJSON(target, format)(orig),
    bin: undefined,
    main: `node.ts`,
    module: `node.ts`,
    types: `node.ts`,
    browser: `dom.ts`,
    type: 'module',
    sideEffects: false,
    esm: { mode: `auto`, sourceMap: true },
    dependencies: {
        '@types/node': '*',
        ...orig.dependencies
    }
});

const createScopedPackageJSON = (target, format) => (({ name, ...orig }) =>
    packageJSONFields.reduce(
        (xs, key) => ({ ...xs, [key]: xs[key] || orig[key] }),
        {
            // un-set version, since it's automatically applied during the release process
            version: undefined,
            // set the scoped package name (e.g. "@reactivex/ix-esnext-esm")
            name: `${npmOrgName}/${npmPkgName}-${packageName(target, format)}`,
            // set "unpkg"/"jsdeliver" if building scoped UMD target
            unpkg: format === 'umd' ? `dom.js` : undefined,
            jsdelivr: format === 'umd' ? `dom.js` : undefined,
            // set "browser" if building scoped UMD target, otherwise "dom"
            browser: format === 'umd' ? `dom.js` : `dom.js`,
            // set "main" to "Ix" if building scoped UMD target, otherwise "node"
            main: format === 'umd' ? `dom.js` : `node.js`,
            // set "type" to `module` or `commonjs` (https://nodejs.org/api/packages.html#packages_type)
            type: format === 'esm' || format === 'cls' ? `module` : `commonjs`,
            // set "module" if building scoped ESM target
            module: format === 'esm' || format === 'cls' ? `node.js` : undefined,
            // set "sideEffects" to false as a hint to Webpack that it's safe to tree-shake the ESM target
            sideEffects: format === 'esm' || format === 'cls' ? false : undefined,
            // include "esm" settings for https://www.npmjs.com/package/esm if building scoped ESM target
            esm: format === `esm` ? { mode: `auto`, sourceMap: true } : undefined,
            // set "types" to "dom" if building scoped UMD target, otherwise "node"
            types: format === 'umd' ? `dom.d.ts` : `node.d.ts`,
            exports: format !== 'umd' ? {
                './package.json': './package.json',
                './Ix.asynciterable.operators': createExport(`asynciterable/operators`),
                './Ix.iterable.operators': createExport(`iterable/operators`),
                './Ix.asynciterable': createExport(`asynciterable`),
                './Ix.iterable': createExport(`iterable`),
                './Ix.node': createExport(`node`),
                './Ix.dom': createExport(`dom`),
                '.': {
                    node: createExport(`node`),
                    ...createExport(`dom`)
                },
                './*': createExport(`*`),
            } : {
                './package.json': './package.json',
                './Ix.asynciterable.operators': createExport(`asynciterable/operators`),
                './asynciterable/operators/*': createExport(`asynciterable/operators`),
                './asynciterable/operators': createExport(`asynciterable/operators`),
                './Ix.iterable.operators': createExport(`iterable/operators`),
                './iterable/operators/*': createExport(`iterable/operators`),
                './iterable/operators': createExport(`iterable/operators`),
                './Ix.asynciterable': createExport(`asynciterable`),
                './asynciterable/*': createExport(`asynciterable`),
                './asynciterable': createExport(`asynciterable`),
                './Ix.iterable': createExport(`iterable`),
                './iterable/*': createExport(`iterable`),
                './iterable': createExport(`iterable`),
                './Ix.node': createExport(`dom`),
                './Ix.dom': createExport(`dom`),
                './Ix': createExport(`dom`),
                '.': createExport(`dom`),
                './*': createExport(`*`),
            },
        }
    )
);

function createDualExport(path) {
    return {
        import: createExport(path, 'mjs'),
        require: createExport(path, 'js')
    };
}

function createExport(path, ext = 'js') {
    return {
        types: `./${path}.d.ts`,
        default: `./${path}.${ext}`
    };
}
