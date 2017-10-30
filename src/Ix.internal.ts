/* `/index` required for closure compiler */
import * as iterableX from './iterable/index';
import * as iterableXPipe from './iterable/pipe/index';
import * as asynciterableX from './asynciterable/index';
import * as asynciterableXPipe from './asynciterable/pipe/index';

export { iterableX as iterable };
export { iterableXPipe as iterablePipe };
export { asynciterableX as asynciterable };
export { asynciterableXPipe as asynciterablePipe };

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
    Ix['iterablePipe'] = iterableXPipe;
    Ix['asynciterable'] = asynciterableX;
    Ix['asynciterablePipe'] = asynciterableXPipe;
  }
} catch (e) {
  /* not the UMD bundle */
}
/** end google declarations */
