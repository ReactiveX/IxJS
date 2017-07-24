/* tslint:disable */
const cwd = process.cwd();
const resolve = require('path').resolve;
require('glob')(`./spec/**/*.ts`, (err: Error, files: string[]) => {
  if (err) throw err;
  files.forEach((file) => require(resolve(cwd, file)));
});