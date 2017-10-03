/* tslint:disable */
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  throw reason;
});

const cwd = process.cwd();
const resolve = require('path').resolve;
require('glob')(`./spec/**/*-spec.ts`, (err: Error, files: string[]) => {
  if (err) throw err;
  files.forEach((file) => require(resolve(cwd, file)));
});