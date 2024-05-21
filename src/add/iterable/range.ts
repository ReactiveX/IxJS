import { IterableX } from '../../iterable/iterablex.js';
import { range as rangeStatic } from '../../iterable/range.js';

/** @nocollapse */
IterableX.range = rangeStatic;

declare module '../../iterable/iterablex' {
  // eslint-disable-next-line no-shadow
  namespace IterableX {
    export let range: typeof rangeStatic;
  }
}
