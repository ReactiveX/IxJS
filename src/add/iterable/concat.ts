import { IterableX } from '../../iterable/iterablex';
import { concat as concatStatic } from '../../iterable/concat';

/** @nocollapse */
IterableX.concat = concatStatic;

declare module '../../iterable/iterablex' {
  /* eslint no-shadow: "off" */
  namespace IterableX {
    export let concat: typeof concatStatic;
  }
}
