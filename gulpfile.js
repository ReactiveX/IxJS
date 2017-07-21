const del = require(`del`);
const gulp = require(`gulp`);
const pump = require(`pump`);
const ts = require(`gulp-typescript`);
const streamMerge = require(`merge2`);
const sourcemaps = require(`gulp-sourcemaps`);
const child_process = require(`child_process`);
const gulpJsonTransform = require(`gulp-json-transform`);
const closureCompiler = require(`google-closure-compiler`).gulp();

const knownTargets = [`es5`, `es2015`, `esnext`];
const knownModules = [`cjs`, `esm`, `sys`, `cls`, `umd`];

const tsModuleNames = {
  esm: `es2015`,
  sys: `system`,
  cjs: `commonjs`,
  cls: `commonjs`,
  umd: `commonjs`,
};
// see: https://github.com/google/closure-compiler/blob/c1372b799d94582eaf4b507a4a22558ff26c403c/src/com/google/javascript/jscomp/CompilerOptions.java#L2988
const gCCTargets = {
  es5: `ECMASCRIPT5`,
  es2015: `ECMASCRIPT_2015`,
  es2016: `ECMASCRIPT_2016`,
  es2017: `ECMASCRIPT_2017`,
  esnext: `ECMASCRIPT_NEXT`
};

const tsProjects = [];
const argv = require(`command-line-args`)([
  { name: `all`, alias: `a`, type: Boolean },
  { name: `target`, type: String, defaultValue: `` },
  { name: `module`, type: String, defaultValue: `` },
  { name: `targets`, alias: `t`, type: String, multiple: true, defaultValue: [] },
  { name: `modules`, alias: `m`, type: String, multiple: true, defaultValue: [] }
]);

const { targets, modules } = argv;

argv.target && !targets.length && targets.push(argv.target);
argv.module && !modules.length && modules.push(argv.module);
(argv.all || (!targets.length && !modules.length))
  && targets.push('all') && modules.push(`all`);

for (const [target, format] of combinations([`all`, `all`])) {
  const combo = `${target}:${format}`;
  gulp.task(`test:${combo}`, ...testTask(target, format));
  gulp.task(`build:${combo}`, ...buildTask(target, format));
  gulp.task(`clean:${combo}`, ...cleanTask(target, format));
  gulp.task(`bundle:${combo}`, ...bundleTask(target, format));
}

gulp.task(`default`, [`build`]);
gulp.task(`test`, (cb) => runTaskCombos(`test`, cb));
gulp.task(`clean`, (cb) => runTaskCombos(`clean`, cb));
gulp.task(`build`, (cb) => runTaskCombos(`bundle`, cb));

function runTaskCombos(name, cb) {
  const combos = [];
  // unsure how to execute tests against closure and system targets
  const skipTestFormats = { cls: true, sys: true };
  for (const [target, format] of combinations(targets, modules)) {
    if (name === 'test' && format in skipTestFormats) {
      continue;
    }
    combos.push(`${name}:${target}:${format}`);
  }
  gulp.start(combos, cb);
}

function cleanTask(target, format) {
  return [
    () => del([ `targets/${target}/${format}/**`])
  ];
}

function buildTask(target, format) {
  return format === `sys`
    ? systemTask(target, format)
    :  format === `umd`
    ? closureTask(target, format)
    :  format === `cls`
    ? tsickleTask(target, format)
    : typescriptTask(target, format);
}

function bundleTask(target, format) {
  return [
    [`build:${target}:${format}`],
    (cb) => pump(
      gulp.src(`package.json`),
      gulpJsonTransform((orig) => [
        `version`, `description`,
        `author`, `homepage`, `bugs`,
        `license`, `keywords`, `typings`,
        `peerDependencies`
      ].reduce((copy, key) => (
        (copy[key] = orig[key]) && copy || copy
      ), {
        main: `Ix.js`,
        name: `@reactivex/${orig.name}/${target}/${format}`
      }), 2),
      gulp.dest(`targets/${target}/${format}`),
      errorOnce(cb)
    )
  ];
}

function testTask(target, format) {
  const specs = `spec/index.ts`;
  const tapReporter = require(`tap-difflet`);
  const reporterOpts = { pessimistic: true };
  const specTSConfigPath = `./spec/tsconfig.json`;
  const tapePath = require.resolve(`tape/bin/tape`);
  const forkOptions = {
    execPath: `ts-node`,
    execArgv: [`--harmony_async_iteration`],
    stdio: [`ignore`, `pipe`, `inherit`, `ipc`],
    env: Object.assign({}, process.env, {
      TS_NODE_FAST: true,
      TS_NODE_CACHE: false,
      TS_NODE_PROJECT: specTSConfigPath
    })
  };
  return [
    (cb) => {
      const onError = errorOnce(cb);
      const reporter = tapReporter(reporterOpts);
      const proc = child_process.fork(
        `spec/index.ts`, [
          `--target`, target,
          `--module`, format
        ],
        forkOptions
      );
      proc.on(`error`, onError);
      proc.on(`close`, (x) => cb());
      pump(proc.stdout, reporter, process.stdout, onError);
    }
  ];
}

function systemTask(target, format) {
  return typescriptTask(target, format);
}

function tsickleTask(target, format) {
  const targetRoot = `targets/${target}/${format}`;
  return [
    [`clean:${target}:${format}`],
    (cb) => {
      const onError = errorOnce(cb);
      const tsickleBin = require.resolve(`tsickle/built/src/main`);
      const proc = child_process.fork(
        tsickleBin, [
          `--externs`, `${targetRoot}/Ix.externs.js`,
          `--typed`, `--`, `-p`, `tsconfig/${target}.${format}/`
        ],
        { stdio: [`ignore`, `inherit`, `inherit`, `ipc`] }
      );
      proc.on(`error`, onError);
      proc.on(`close`, (x) => cb());
    }
  ];
}

function closureTask(target, format) {
  const clsTarget = `es5`;
  const googleRoot = `targets/es5/cls`;
  const sourceGlob = `${googleRoot}/**/*.js`;
  const targetRoot = `targets/${target}/${format}`;
  const externsPath = `${googleRoot}/Ix.externs.js`;
  return [
    [`clean:${target}:${format}`, `build:${clsTarget}:cls`],
    (cb) => {
      const onError = errorOnce(cb);
      return streamMerge([
        closureStream(closureSrcs(), `Ix`, onError, true),
        closureStream(closureSrcs(), `Ix.internal`, onError)
      ]);
    }
  ];
  function closureSrcs() {
    return gulp.src([
      `scripts/tslib.js`, sourceGlob, `!${externsPath}`
    ], { base: `./` });
  }
  function closureStream(sources, entry, onError, copyToDist) {
    const streams = [
      sources,
      sourcemaps.init(),
      closureCompiler(closureArgs(entry)),
      sourcemaps.write('.'),
      gulp.dest(`${targetRoot}`)
    ];
    // copy the UMD bundle to dist
    if (target === `es5` && copyToDist) {
      streams.push(gulp.dest(`dist`))
    }
    return pump(...streams, onError);
  }
  function closureArgs(entry) {
    return {
      externs: externsPath,
      warning_level: `QUIET`,
      dependency_mode: `LOOSE`,
      rewrite_polyfills: false,
      // formatting: `PRETTY_PRINT`,
      module_resolution: `LEGACY`,
      compilation_level: `ADVANCED`,
      assume_function_wrapper: true,
      js_output_file: `${entry}.js`,
      language_out: gCCTargets[`es5`],
      language_in: gCCTargets[clsTarget],
      entry_point: `targets.${clsTarget}.cls.${entry}`,
      output_wrapper: `(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory(global.Ix = global.Ix || {}));
}(this, (function (exports) {%output%}.bind(this))));`
    };
  }
}

function typescriptTask(target, format) {
  return [
    [`clean:${target}:${format}`],
    (cb) => {
      const onError = errorOnce(cb);
      const targetRoot = `targets/${target}/${format}`;
      const tsconfigPath = `tsconfig/tsconfig.${target}.${format}.json`;
      const { tsProject } = (
        tsProjects.find((p) => p.target === target && p.format === format) ||
        tsProjects[-1 + tsProjects.push({
          target, format, tsProject: ts.createProject(tsconfigPath)
        })]
      );
      const { js, dts } = pump(
        tsProject.src(),
        sourcemaps.init(),
        tsProject(ts.reporter.fullReporter(true)),
        onError
      );
      const dtsStreams = [dts, gulp.dest(`${targetRoot}/types`)];
      const jsStreams = [js, sourcemaps.write(), gulp.dest(targetRoot)];
      // copy types to the root
      if (target === `es5` && format === `cjs`) {
        dtsStreams.push(gulp.dest(`types`));
      }
      return streamMerge([
        pump(...dtsStreams, onError),
        pump(...jsStreams, onError)
      ]);
    }
  ];
}

function errorOnce(cb) {
  let errored = false;
  return (err) => err && !errored && (errored = true) && cb(err)
}

function* combinations(_targets, _modules) {

  const targets = known(knownTargets, _targets || [`all`]);
  const modules = known(knownModules, _modules || [`all`]);

  for (const format of modules) {
    for (const target of targets) {
      yield [target, format];
    }
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
