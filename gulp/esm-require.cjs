const esm = require('esm');

const esmRequire = esm(module, {
    mode: `auto`,
    cjs: {
        /* A boolean for storing ES modules in require.cache. */
        cache: true,
        /* A boolean for respecting require.extensions in ESM. */
        extensions: true,
        /* A boolean for __esModule interoperability. */
        interop: true,
        /* A boolean for importing named exports of CJS modules. */
        namedExports: true,
        /* A boolean for following CJS path rules in ESM. */
        paths: true,
        /* A boolean for __dirname, __filename, and require in ESM. */
        vars: true,
    }
});

module.exports = esmRequire;
