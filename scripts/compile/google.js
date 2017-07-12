const { targetPath, execNpmScript } = require('../util');

module.exports = createGoogleCompiler;

function createGoogleCompiler(compile) {
    return function compileGoogle(target, format) {
        const targetRoot = targetPath(target, format);
        const tscArgs = `-m commonjs --target ${target.toUpperCase()} --outDir ${targetRoot} --declarationDir ${targetRoot}/types`;
        const tsickleCmd = `tsickle --externs ${targetRoot}/Ix.externs.js --typed -- -p . ${tscArgs}`;
        return execNpmScript(tsickleCmd);
    };
}
