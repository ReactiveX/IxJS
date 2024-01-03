import { IterableX } from '../../iterable/iterablex.js';
import { empty as emptyStatic } from '../../iterable/empty.js';

/** @nocollapse */
IterableX.empty = emptyStatic;

declare module '../../iterable/iterablex' {
  // eslint-disable-next-line no-shadow
  namespace IterableX {
    export let empty: typeof emptyStatic;
  }
}
