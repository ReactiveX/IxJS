import { IterableX } from '../../iterable/iterablex';
import { defer as deferStatic } from '../../iterable/defer';

/** @nocollapse */
IterableX.defer = deferStatic;

declare module '../../iterable/iterablex' {
  // eslint-disable-next-line no-shadow
  namespace IterableX {
    export let defer: typeof deferStatic;
  }
}
