import * as iterableX from './iterable/__modules';
import * as asynciterableX from './asynciterable/__modules';
export { iterableX as iterable, asynciterableX as asynciterable };

/* These declarations are needed for the closure/umd targets */
export declare namespace Symbol {
  export const iterator: symbol;
  export const asyncIterator: symbol;
}
try {
  const Ix = eval('exports');
  if (typeof Ix === 'object') {
    // string indexers tell closure compiler not to rename these properties
    Ix['iterable'] = iterableX;
    Ix['asynciterable'] = asynciterableX;
  }
} catch (e) { /* not the UMD bundle */ }
/** end google declarations */
