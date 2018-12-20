import { IterableX } from '../../iterable/iterablex';
import { defer as deferStatic } from '../../iterable/defer';

/** @nocollapse */
IterableX.defer = deferStatic;

declare module '../../iterable/iterablex' {
  namespace IterableX { export let defer: typeof deferStatic; }
}
