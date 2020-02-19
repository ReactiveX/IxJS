/* eslint-disable @typescript-eslint/no-require-imports */
process.on('unhandledRejection', (error: any) => {
  // Won't execute
  console.log('unhandledRejection', error.test);
});

const cwd = process.cwd();
const resolve = require('path').resolve;
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('glob')('./spec/**/*-spec.ts', (err: Error, files: string[]) => {
  if (err) {
    throw err;
  }
  files.forEach(file => require(resolve(cwd, file)));
});
