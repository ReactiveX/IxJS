## the npm scripts

* `npm run clean` - cleans targets
* `npm run build` - cleans and compiles all targets
* `npm test` - executes tests against built targets

These npm scripts accept argument lists of targets × modules:

* Available `targets` are `es5`, `es2015`, `esnext`, and `all` (default: `all`)
* Available `modules` are `cjs`, `esm`, `sys`, `cls`, `umd`, and `all` (default: `all`)

Examples:
* `npm run build` -- builds all ES targets in all module formats
* `npm run build -- -t es5 -m all` -- builds the ES5 target in all module formats
* `npm run build -- -t all -m cjs` -- builds all ES targets in the CommonJS module format
* `npm run build -- --targets es5 es2015 -m all` -- builds the ES5 and ES2015 targets in all module formats
* `npm run build -- -t es5 --modules cjs esm` -- builds the ES5 target in CommonJS and ESModules module formats

This argument configuration also applies to `clean` and `test` scripts.

## `npm run deploy`

Uses [learna](https://github.com/lerna/lerna) to publish each build target to npm with [conventional](https://conventionalcommits.org/) [changelogs](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli).
