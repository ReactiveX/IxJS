const targets = ['es5', 'es2015', 'esnext'];
const formats = ['cjs', 'esm', 'sys', 'cls', 'umd'];
// see: https://github.com/google/closure-compiler/blob/c1372b799d94582eaf4b507a4a22558ff26c403c/src/com/google/javascript/jscomp/CompilerOptions.java#L2988
const gCCTargets = {
    es5: 'ECMASCRIPT5',
    es2015: `ECMASCRIPT_2015`,
    es2016: `ECMASCRIPT_2016`,
    es2017: `ECMASCRIPT_2017`,
    esnext: `ECMASCRIPT_NEXT`
};

module.exports = { targets, formats, gCCTargets };

const createCompiler = require('./compile');
const createGoogleCompiler = require('./compile/google');
const createGlobalCompiler = require('./compile/global');
const createTypescriptCompiler = require('./compile/typescript');

const compilers = {};
const compile = createCompiler(compilers);
const compileGoogle = createGoogleCompiler(compile);
const compileGlobal = createGlobalCompiler(compile);
const compileTypescript = createTypescriptCompiler(compile);

compilers.cjs = ['tsc', compileTypescript];
compilers.esm = ['tsc', compileTypescript];
compilers.sys = ['tsc', compileTypescript];
compilers.cls = ['tsickle', compileGoogle];
compilers.umd = ['closure', compileGlobal];

module.exports.compile = compile;