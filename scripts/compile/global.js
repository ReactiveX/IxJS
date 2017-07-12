const { Observable } = require('rxjs');
const { gCCTargets } = require('../config');
const child_process = require('child_process');
const { spawn: spawnRx } = require('spawn-rx');
const { targetPath, execNpmScript, mkdirpObs, npmRoot } = require('../util');

module.exports = createGlobalCompiler;

function createGlobalCompiler(compile) {
    // unbind these methods when closure-compiler fixes its ES6+ iterator transpilation
    const compileGoogle = compile.bind(null, `es5`, `cls`);
    const googleTargetPath = targetPath.bind(null, `es5`, `cls`);
    const closureCompilerArgs = closureArgs.bind(null, googleTargetPath, `es5`);
    return function compileGlobal(target, format) {
        const targetRoot = targetPath(target, format);
        return compileGoogle(target, `cls`).ignoreElements().concat(
            compileClosure(target, format, googleTargetPath, closureCompilerArgs));
    }
}

function compileClosure(target, format, googleTargetPath, closureCompilerArgs) {
    const targetRoot = targetPath(target, format);
    const googTarget = googleTargetPath(target, `cls`);
    const jarPath = `${npmRoot}/google-closure-compiler/compiler.jar`;
    return Observable.concat(
        spawnRx(`java`, [`-jar`, jarPath, ...closureCompilerArgs(target, format, 'Ix')]),
        spawnRx(`java`, [`-jar`, jarPath, ...closureCompilerArgs(target, format, 'Ix.internal')]),
        mkdirpObs(`${targetRoot}/types`),
        execNpmScript(`shx cp -r ${googTarget}/types/* ${targetRoot}/types`)
    ).ignoreElements();
}

function closureArgs(googleTargetPath, inTarget, target, format, entry) {
    const targetRoot = targetPath(target, format);
    const googTarget = googleTargetPath(target, `cls`);
    const tsickleExternsPath = `${googTarget}/Ix.externs.js`;
    return [
        `--js`, `scripts/tslib.js`,
        `--js`, `${googTarget}/**.js`,
        `--js`, `!${tsickleExternsPath}`,
        `--externs=${tsickleExternsPath}`,
        `--language_in=${gCCTargets[inTarget]}`,
        `--language_out=${gCCTargets[target]}`,
        `--js_output_file=${targetRoot}/${entry}.js`,
        `--entry_point=targets.${inTarget}.cls.${entry}`,
        `--create_source_map=${targetRoot}/${entry}.js.map`,
        // `--formatting=PRETTY_PRINT`,
        `--warning_level=QUIET`,
        `--dependency_mode=LOOSE`,
        `--rewrite_polyfills=false`,
        `--module_resolution=LEGACY`,
        `--compilation_level=ADVANCED`,
        `--assume_function_wrapper=true`,
        `--output_wrapper=(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory(global.Ix = global.Ix || {}));
}(this, (function (exports) {
  %output%
}.bind(this))));
//# sourceMappingURL=${entry}.js.map`
    ];
}