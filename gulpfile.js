process.stdout.setMaxListeners(Math.pow(10, 6));
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  throw reason;
});

const IS_TRAVIS = process.env.IS_TRAVIS || false;

const del = require(`del`);
const gulp = require(`gulp`);
const path = require(`path`);
const pump = require(`pump`);
const webpack = require(`webpack`);
const ts = require(`gulp-typescript`);
const streamMerge = require(`merge2`);
const tapdiff = require(`tap-difflet`);
const gulpRename = require(`gulp-rename`);
const sourcemaps = require(`gulp-sourcemaps`);
const { spawn: spawnRx } = require(`spawn-rx`);
const child_process = require(`child_process`);
const gulpJsonTransform = require(`gulp-json-transform`);
const UglifyJSPlugin = require(`uglifyjs-webpack-plugin`);
const closureCompiler = require(`google-closure-compiler`).gulp();
const { Observable, Scheduler, ReplaySubject } = require(`rxjs`);
const esmRequire = require(`@std/esm`)(module, { cjs: true, esm: `js` });

const releasesRootDir = `targets`;
const knownTargets = [`es5`, `es2015`, `esnext`];
const knownModules = [`cjs`, `esm`, `cls`, `umd`];
const moduleFormatsToSkipCombosOf = { cls: true };
const metadataFiles = [`LICENSE`, `readme.md`, `CHANGELOG.md`];
const packageJSONFields = [
  `version`, `license`, `description`,
  `author`, `homepage`, `repository`,
  `bugs`, `keywords`,  `dependencies`
];

const argv = require(`command-line-args`)([
  { name: `all`, alias: `a`, type: Boolean },
  { name: `target`, type: String, defaultValue: `` },
  { name: `module`, type: String, defaultValue: `` },
  { name: `loglvl`, alias: `l`, type: Number, defaultValue: 3 },
  { name: `targets`, alias: `t`, type: String, multiple: true, defaultValue: [] },
  { name: `modules`, alias: `m`, type: String, multiple: true, defaultValue: [] }
]);

// ES7+ keywords Uglify shouldn't mangle
// Hardcoded here since some are from ES7+, others are
// only defined in interfaces, so difficult to get by reflection.
const IxKeywords = [
  // GroupedIterable/GroupedAsyncIterable
  `key`,
  // IteratorResult, Symbol.asyncIterator
  `done`, `value`, `asyncIterator`,
  // AsyncObserver
  `values`, `hasError`, `hasCompleted`,`errorValue`, `closed`,
  // Observable/Subscription/Scheduler
  `next`, `error`, `complete`, `subscribe`, `unsubscribe`, `isUnsubscribed`,
  // EventTarget
  `addListener`, `removeListener`, `addEventListener`, `removeEventListener`,
];

// see: https://github.com/google/closure-compiler/blob/c1372b799d94582eaf4b507a4a22558ff26c403c/src/com/google/javascript/jscomp/CompilerOptions.java#L2988
const gCCLanguageNames = {
     es5: `ECMASCRIPT5`,
  es2015: `ECMASCRIPT_2015`,
  es2016: `ECMASCRIPT_2016`,
  es2017: `ECMASCRIPT_2017`,
  esnext: `ECMASCRIPT_NEXT`
};

const UMDSourceTargets = {
  es5: `es5`,
  es2015: `es2015`,
  es2016: `es2015`,
  es2017: `es2015`,
  esnext: `es2015`
};

const uglifyLanguageNames = {
  es5: 5, es2015: 6,
  es2016: 7, es2017: 8,
  esnext: 8 // <--- ?
};

Observable.prototype.logEverything = function(tag = `Observable`, loglevel = argv.loglvl) {
  return this.do({
    next(x) { loglevel <= 1 && console.log(`${tag} next:`, x) },
    error(e) { loglevel <= 3 && console.error(`${tag} error:`, e); },
    complete() { loglevel <= 2 && console.log(`${tag} complete`); }
  }).finally(() => loglevel <= 2 && console.log(`${tag} disposed`));
};

function _die(e) {
  if (e) {
    console.error(e);
    process.exit(1);
  }
}

Observable.fromStream = function observableFromStreams(...streams) {
  const pumped = streams.length <= 1 ? streams[0] : pump(...streams, _die);
  const fromEvent = Observable.fromEvent.bind(null, pumped);
  const streamObs = fromEvent(`data`)
             .merge(fromEvent(`error`).flatMap((e) => Observable.throw(e)))
         .takeUntil(fromEvent(`end`).merge(fromEvent(`close`)))
         .defaultIfEmpty(`empty stream`)
         .logEverything(`fromStream`)
         .multicast(new ReplaySubject()).refCount();
  streamObs.stream = pumped;
  streamObs.observable = streamObs;
  return streamObs;
};

const memoizeTask = ((cache, taskFn) => ((target, format, ...args) => {
  // Give the memoized fn a displayName so gulp's output is easier to follow.
  const fn = () => (
    cache[_taskHash(target, format, ...args)] || (
    cache[_taskHash(target, format, ...args)] = taskFn(target, format, ...args)
                                               .logEverything(fn.displayName)));
  fn.displayName = `${taskFn.name || ``}:${_taskHash(target, format, ...args)}:task`;
  return fn;
}));

const cleanTask = ((cache) => memoizeTask(cache, function clean(target, format) {
  return Observable.from(del(`${_dir(target, format)}/**`)).multicast(new ReplaySubject()).refCount();
}))({});

const buildTask = ((cache) => memoizeTask(cache, function build(target, format, ...args) {
  return target === `ts`  ? copyTSSources(target, format, ...args)()
       : target === `ix`  ? copyIxTargets(target, format, ...args)()
       : format === `umd` ? target === `es5` 
                          ?  compileClosure(target, format, ...args)()
                          : compileUglifyJS(target, format, ...args)()
       : format === `cls` && target === `es5`
                          ?  compileTsickle(target, format, ...args)()
                          : compileTypescript(target, format, ...args)();
}))({});

const bundleTask = ((cache) => memoizeTask(cache, function bundle(target, format) {
  const out = _dir(target, format);
  const jsonTransform = gulpJsonTransform(target === `ix` ? createIxPackageJson(target, format) :
                                          target === `ts` ? createTsPackageJson(target, format) :
                                                            createScopedPackage(target, format) ,
                                          2);
  return Observable.forkJoin(
    Observable.fromStream(gulp.src(metadataFiles), gulp.dest(out)), // copy metadata files
    Observable.fromStream(gulp.src(`package.json`), jsonTransform, gulp.dest(out)) // write packageJSONs
  );
}))({});

const testsTask = ((cache, testOptions) => memoizeTask(cache, function tests(target, format, debug) {
  const opts = { ...testOptions };
  debug && (opts.execArgv = [...opts.execArgv, `--inspect-brk`]);
  opts.env = { ...opts.env, IX_TARGET: target, IX_MODULE: format };
  const proc = child_process.fork(`spec/index.ts`, [], opts);
  const diff = tapdiff({ pessimistic: true });
  pump(proc.stdout, diff, process.stdout, _die);
  return Observable.fromStream(proc).delay(1000);
}))({}, {
  execPath: `./node_modules/.bin/ts-node`,
  execArgv: [`--harmony_async_iteration`],
  stdio: [`ignore`, `pipe`, `ignore`, `ipc`],
  env: {
    ...process.env,
    TS_NODE_TYPE_CHECK: false,
    TS_NODE_CACHE: false, TS_NODE_FAST: true,
    TS_NODE_PROJECT:  `./spec/tsconfig.json`,
  }
});

const copyTSSources = ((cache) => memoizeTask(cache, function copyTS(target, format) {
  return Observable.fromStream(gulp.src(`src/**/*`), gulp.dest(_dir(target, format)));
}))({});

const copyIxTargets = ((cache) => memoizeTask(cache, function copyIx(target, format) {
  const out = _dir(target), srcGlob = `src/**/*`;
  const es5Glob = `${_dir(`es5`, `cjs`)}/**/*.js`;
  const esmGlob = `${_dir(`es2015`, `esm`)}/**/*.js`;
  const es5UmdGlob = `${_dir(`es5`, `umd`)}/**/*.js`;
  const es5UmdMaps = `${_dir(`es5`, `umd`)}/**/*.map`;
  const es2015UmdGlob = `${_dir(`es2015`, `umd`)}/**/*.js`;
  const es2015UmdMaps = `${_dir(`es2015`, `umd`)}/**/*.map`;
  const ch_ext = (ext) => gulpRename((p) => { p.extname = ext; });
  const append = (ap) => gulpRename((p) => { p.basename += ap; });
  return Observable.forkJoin(
    Observable.fromStream(gulp.src(srcGlob), gulp.dest(out)), // copy src ts files
    Observable.fromStream(gulp.src(es5Glob), gulp.dest(out)), // copy es5 cjs files
    Observable.fromStream(gulp.src(esmGlob), ch_ext(`.mjs`), gulp.dest(out)), // copy es2015 esm files and rename to `.mjs`
    Observable.fromStream(gulp.src(es5UmdGlob), append(`.es5.min`), gulp.dest(out)), // copy es5 umd files and add `.min`
    Observable.fromStream(gulp.src(es5UmdMaps),                     gulp.dest(out)), // copy es5 umd sourcemap files, but don't rename
    Observable.fromStream(gulp.src(es2015UmdGlob), append(`.es2015.min`), gulp.dest(out)), // copy es2015 umd files and add `.es6.min`
    Observable.fromStream(gulp.src(es2015UmdMaps),                        gulp.dest(out)), // copy es2015 umd sourcemap files, but don't rename
  );
}))({});

const compileTsickle = ((cache, tsicklePath) => memoizeTask(cache, function tsickle(target, format) {
  return spawnRx(tsicklePath,
    [
      `--typed`, `--externs`,
        `${_dir(target, format)}/Ix.externs.js`,
      `--`, `-p`, `tsconfig/${_tsconfig(target, format)}`
    ],
    { stdio: [`ignore`, `pipe`, `pipe`] }
  ).multicast(new ReplaySubject()).refCount();
}))({}, require.resolve(`tsickle/built/src/main`));
  
const compileTypescript = ((cache) => memoizeTask(cache, function typescript(target, format) {
  const out = _dir(target, format);
  const tsconfigFile = `tsconfig.${_tsconfig(target, format)}.json`;
  const tsProject = ts.createProject(path.join(`tsconfig`, tsconfigFile));
  const { observable: compilation, stream: { js, dts } } = Observable.fromStream(
    tsProject.src(), sourcemaps.init(),
    tsProject(ts.reporter.fullReporter(true))
  );
  const writeDTypes = Observable.fromStream(dts, gulp.dest(out));
  const writeJS = Observable.fromStream(js, sourcemaps.write(), gulp.dest(out));
  return Observable.forkJoin(compilation, writeDTypes, writeJS);
}))({});

const compileUglifyJS = ((cache, commonConfig) => memoizeTask(cache, function uglifyJS(target, format) {

  const sourceTarget = UMDSourceTargets[target];
  const PublicNames = reservePublicNames(sourceTarget, `cls`);
  const InternalNames = reserveInternalNames(sourceTarget, `cls`);
  const out = _dir(target, format), src = _dir(sourceTarget, `cls`);

  const targetConfig = {
              ...commonConfig,
    output: { ...commonConfig.output,
       path: path.join(process.cwd(), `${out}/`) } };

  const webpackConfigs = [
    [`Ix`, PublicNames],
    [`Ix.Internal`, InternalNames]
  ].map(([entry, reserved]) => ({
    ...targetConfig, 
    entry: { [entry]: path.resolve(`${src}/${entry}.js`) },
    plugins: [
      ...(targetConfig.plugins || []),
      new webpack.SourceMapDevToolPlugin({
        filename: `[name].${target}.min.js.map`,
        moduleFilenameTemplate: ({ resourcePath }) =>
          resourcePath
            .replace(/\s/, `_`)
            .replace(/\.\/node_modules\//, '')
      }),
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          ecma: uglifyLanguageNames[target],
          compress: { unsafe: true, },
          output: { comments: false, beautify: false },
          mangle: { eval: true, safari10: true, // <-- Works around a Safari 10 bug: // https://github.com/mishoo/UglifyJS2/issues/1753
              properties: { reserved }, reserved,
          }
        },
      })
    ]
  }));

  const compilers = webpack(webpackConfigs);

  return Observable
    .bindNodeCallback(compilers.run.bind(compilers))()
    .multicast(new ReplaySubject()).refCount();

}))({}, {
  resolve: { mainFields: [`module`, `main`] },
  output: { filename: '[name].js', library: `Ix`, libraryTarget: `umd`, },
  module: { rules: [{ test: /\.js$/, enforce: `pre`, use: [`source-map-loader`] }] }
});

const compileClosure = ((cache) => memoizeTask(cache, function closure(target, format) {
  const src = _dir(target, `cls`), out = _dir(target, format);
  const closureStreams = [
             [`Ix`, `Ix.internal`],
             [`Ix.internal`, `Ix`]
      ].map(([entry, otherEntryFile]) => [
    gulp.src([
  /*   tslib comes first, --> */`scripts/tslib.js`,  
 /*   then sources glob, --> */ `${src}/**/*.js`,
/*  and exclusions last --> */ `!${src}/Ix.externs.js`,
                               `!${src}/${otherEntryFile}.js`
    ], { base: `./` }), sourcemaps.init(),
    closureCompiler(createClosureArgs(target, entry, `${src}/Ix.externs.js`)),
    // rename the sourcemaps from *.js.map files to *.min.js.map
    sourcemaps.write('.', { mapFile: (mapPath) => mapPath.replace(`.js.map`, `.${target}.min.js.map`) }),
    gulp.dest(out)
  ]);
  return Observable.forkJoin(closureStreams.map((streams) => Observable.fromStream(...streams)));
}))({});

const createIxPackageJson = (target, format) => (orig) => ({
  ...createTsPackageJson(target, format)(orig),
  name: orig.name,
  main: `Ix.js`,
  module: `Ix.mjs`,
  browser: `Ix.min.js`,
  [`@std/esm`]: { esm: `mjs` }
});

const createTsPackageJson = (target, format) => (orig) => ({
  ...createScopedPackage(target, format)(orig),
  main: `Ix.ts`, types: `Ix.ts`
});

const createScopedPackage = (target, format) => (({ name, ...orig }) =>
  conditionallyAddStandardESMEntry(target, format)(
    packageJSONFields.reduce(
      (xs, key) => ({ ...xs, [key]: xs[key] || orig[key] }),
      { name: `@reactivex/${name}-${_name(target, format)}`,
        version: undefined, main: `Ix.js`, types: `Ix.d.ts`,
        module: undefined, browser: undefined, [`@std/esm`]: undefined }
    )
  )
);

const conditionallyAddStandardESMEntry = (target, format) => (packageJSON) => (
  format !== `esm`
    ? packageJSON
    : { ...packageJSON, [`@std/esm`]: { esm: `js` } }
);

const createClosureArgs = (target, entry, externs) => ({
    externs,
    warning_level: `QUIET`,
    dependency_mode: `LOOSE`,
    rewrite_polyfills: false,
    // formatting: `PRETTY_PRINT`,
    compilation_level: `ADVANCED`,
    assume_function_wrapper: true,
    js_output_file: `${entry}.js`,
    language_in: gCCLanguageNames[target],
    language_out: gCCLanguageNames[target],
    entry_point: `targets.${target}.cls.${entry}`,
    output_wrapper: `(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(factory(global.Ix = global.Ix || {}));
}(this, (function (exports) {%output%}.bind(this))));`
});

const reservePublicNames = ((IxKeywords) => function reservePublicNames(target, format) {
  const publicModulePath = `./${_dir(target, format)}/Ix.js`;
  return [
    ...IxKeywords,
    ...reserveExportedNames(esmRequire(publicModulePath))
  ];
})(IxKeywords);

const reserveInternalNames = ((IxKeywords) => function reserveInternalNames(target, format) {
  const internalModulePath = `./${_dir(target, format)}/Ix.internal.js`;
  return [
    ...IxKeywords,
    ...reservePublicNames(target, format),
    ...reserveExportedNames(esmRequire(internalModulePath))
  ];
})(IxKeywords);

// Reflect on the Ix/Ix.internal modules to come up with a list
// of keys to save from Uglify's mangler. Assume all the non-inherited
// static and prototype members of the Ix module and its direct exports
// are public, and should be preserved through minification. This isn't
// an exhaustive list, since some properties we need are only exported
// as types/interfaces (see comment at `IxKeywords` declaration above)
const reserveExportedNames = (entryModule) => (
  Object
    .getOwnPropertyNames(entryModule)
    .filter((name) => (
      typeof entryModule[name] === `object` ||
      typeof entryModule[name] === `function`
    ))
    .map((name) => [name, entryModule[name]])
    .reduce((reserved, [name, value]) => {
      const fn = function() {};
      const ownKeys = value && Object.getOwnPropertyNames(value) || [];
      const protoKeys = typeof value === `function` && Object.getOwnPropertyNames(value.prototype) || [];
      const publicNames = [...ownKeys, ...protoKeys].filter((x) => x !== `undefined` && !(x in fn));
      return [...reserved, name, ...publicNames];
    }, []
  )
);

const { targets, modules } = argv;

argv.target && !targets.length && targets.push(argv.target);
argv.module && !modules.length && modules.push(argv.module);
(argv.all || !targets.length) && targets.push(`all`);
(argv.all || !modules.length) && modules.push(`all`);

for (const [target, format] of combinations([`all`], [`all`])) {
  const task = _task(target, format);
  gulp.task(`clean:${task}`, cleanTask(target, format));
  gulp.task( `test:${task}`, testsTask(target, format, false));
  gulp.task(`debug:${task}`, testsTask(target, format, true));
  gulp.task(`build:${task}`, gulp.series(`clean:${task}`,
                                          buildTask(target, format),
                                          bundleTask(target, format)));
}

// The UMD bundles build temporary es5/6/next targets via TS,
// then run the TS source through either closure-compiler or
// uglify, so we special case that here.
knownTargets.forEach((target) =>
  gulp.task(`build:${target}:umd`,
    gulp.series(
       `clean:${target}:umd`,
       `build:${UMDSourceTargets[target]}:cls`,
        buildTask(target, `umd`),
        bundleTask(target, `umd`)
    )
  )
);

// The main "ix" module builds the es5/cjs, es5/umd,
// es2015/esm, es2015/umd, and ts targets, then copies
// and renames the compiled output into the ix folder.
gulp.task(`build:ix`,
  gulp.series(
   `clean:ix`,
   `build:${_task(`es5`, `cjs`)}`,
   `build:${_task(`es5`, `umd`)}`,
   `build:${_task(`es2015`, `esm`)}`,
   `build:${_task(`es2015`, `umd`)}`,
    buildTask(`ix`),
    bundleTask(`ix`)
  )
);

const numCPUs = (m = 1) => IS_TRAVIS ? 1 : require(`os`).cpus().length * m | 0;
function gulpConcurrent(tasks, concurrent = numCPUs(0.5)) {
  const parallel = Observable.bindCallback((tasks, cb) => gulp.parallel(tasks)(cb));
  return () => Observable.from(tasks).bufferCount(Math.max(concurrent, 1)).concatMap((xs) => parallel(xs));
}

const buildConcurrent = (tasks, concurrent = numCPUs()) => () =>
    gulpConcurrent(tasks, concurrent)()
      .concat(Observable
        .defer(() => Observable
          .merge(...knownTargets.map((target) =>
            cleanTask(UMDSourceTargets[target], `cls`, target, `umd`)()))));

gulp.task( `test`, gulpConcurrent(getTasks(`test`)));
gulp.task(`build`,buildConcurrent(getTasks(`build`)));
gulp.task(`clean`, gulpConcurrent(getTasks(`clean`)));
gulp.task(`debug`, gulpConcurrent(getTasks(`debug`)));
gulp.task(`default`,  gulp.series(`build`, `test`));

function getTasks(name) {
  const tasks = [];
  if (targets.indexOf(`ts`) !== -1) tasks.push(`${name}:ts`);
  if (targets.indexOf(`ix`) !== -1) tasks.push(`${name}:ix`);
  for (const [target, format] of combinations(targets, modules)) {
    if (format in moduleFormatsToSkipCombosOf) {
      continue;
    }
    tasks.push(`${name}:${_task(target, format)}`);
  }
  return tasks.length && tasks || [(done) => done()];
}

function _name(target, format) { return !format ? target : `${target}-${format}`; }
function _task(target, format) { return !format ? target : `${target}:${format}`; }
function _tsconfig(target, format) { return !format ? target : `${target}.${format}`; }
function _taskHash(...args) { return args.filter((x) => x !== void 0 && x !== ``).join(`:`); }
function _dir(target, format) { return path.join(releasesRootDir, ...(!format ? [target] : [target, format])); }

function* combinations(_targets, _modules) {

  const targets = known(knownTargets, _targets || (_targets = [`all`]));
  const modules = known(knownModules, _modules || (_modules = [`all`]));

  for (const format of modules) {
    for (const target of targets) {
      yield [target, format];
    }
  }

  if (_targets[0] === `all` && _modules[0] === `all`) {
    yield [`ts`, ``];
    yield [`ix`, ``];
  }

  function known(known, values) {
    return ~values.indexOf(`all`)
      ? known
      : Object.keys(
        values.reduce((map, arg) => ((
          (known.indexOf(arg) !== -1) &&
          (map[arg.toLowerCase()] = true)
          || true) && map
        ), {})
      ).sort((a, b) => known.indexOf(a) - known.indexOf(b));
  }
}
