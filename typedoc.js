module.exports = {
    src: 'src',
    out: 'doc',
    mode: 'file',
    name: 'IxJS',
    target: 'ES6',
    module: 'commonjs',
    tsconfig: 'tsconfig.json',
    excludePrivate: true,
    excludeProtected: true,
    excludeExternals: true,
    excludeNotExported: true,
    ignoreCompilerErrors: true
};
