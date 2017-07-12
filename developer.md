## the npm scripts

* `npm run clean` - cleans targets
* `npm run compile` - compiles targets
* `npm run build` - cleans and compiles all targets
* `npm test` - executes tests against built targets

All npm scripts accept space-delimited arguments list of target x module:

* Available `targets` are `es5`, `es2015`, and `esnext`.
* Available `modules` are `cjs`, `esm`, `sys`, `cls`, and `umd`.

Examples:
* `npm run build es5` -- builds the `cjs`, `esm`, `sys`, `cls`, and `umd` modules for the ES5 target
* `npm run build es5 cjs esm` -- builds the `es5` target for both CommonJS and ESModules module formats
* `npm run build cjs` -- builds the `es5`, `es2015`, and `esnext` targets for the CommonJS module format

This argument configuration also applies to clean, compile, and test scripts.

## `npm run deploy`

Uses learna to publish each build target to npm with conventional changelogs

## todos:

1. make the tests use the public APIs so they can be run against the UMD bundles
2. file a bug against closure compiler's ES6+ async iterator transpiler being broken
3. investigate if the typescript compiler can compile the src once, then emit multiple targets/modules
