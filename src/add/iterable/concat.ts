import { IterableX } from '../../iterable/iterablex.js';
import { concat as concatStatic } from '../../iterable/concat.js';

/** @nocollapse */
IterableX.concat = concatStatic;

declare module '../../iterable/iterablex' {
  // eslint-disable-next-line no-shadow
  namespace IterableX {
    export let concat: typeof concatStatic;
  }
}
