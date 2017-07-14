const { tsConfigPath, targetPath, execNpmScript } = require('../util');

module.exports = createTypescriptCompiler;

function createTypescriptCompiler(compiler) {
    // todo: use the typescript compiler module parse/bind/check once and emit many
    return function compileTypescript(target, format) {
        const targetRoot = targetPath(target, format);
        const tsconfigPath = tsConfigPath(target, format);
        return execNpmScript(`tsc -p ${tsconfigPath}`);
    }
}
