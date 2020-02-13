import { IterableX } from '../../iterable/iterablex';
import { range as rangeStatic } from '../../iterable/range';

/** @nocollapse */
IterableX.range = rangeStatic;

declare module '../../iterable/iterablex' {
  /* eslint no-shadow: "off" */
  namespace IterableX {
    export let range: typeof rangeStatic;
  }
}
