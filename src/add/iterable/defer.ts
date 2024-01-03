import { IterableX } from '../../iterable/iterablex.js';
import { defer as deferStatic } from '../../iterable/defer.js';

/** @nocollapse */
IterableX.defer = deferStatic;

declare module '../../iterable/iterablex' {
  // eslint-disable-next-line no-shadow
  namespace IterableX {
    export let defer: typeof deferStatic;
  }
}
