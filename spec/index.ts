/* tslint:disable */
process.on('unhandledRejection', error => {
  // Won't execute
  console.log('unhandledRejection', error.test);
});

const cwd = process.cwd(), path = require('path');
require('glob')(path.join(`.`, `spec`, `**`, `*-spec.ts`), (err: Error, files: string[]) => {
  if (err) throw err;
  files.forEach((file) => require(path.resolve(cwd, file)));
});