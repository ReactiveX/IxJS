/* tslint:disable */
(async function () {
    // SystemJS _always_ loads async, so wait till it loads the Ix
    // target we're testing, then run the tests
    await require('./Ix').IxAsync;
    const cwd = process.cwd();
    const resolve = require('path').resolve;
    require('glob')(`./spec/**/*.ts`, (err: Error, files: string[]) => {
        if (err) throw err;
        files.forEach((file) => require(resolve(cwd, file)));
    });
})();
