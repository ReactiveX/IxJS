import { IterableX } from '../../iterable/iterablex';
import { empty as emptyStatic } from '../../iterable/empty';

/** @nocollapse */
IterableX.empty = emptyStatic;

declare module '../../iterable/iterablex' {
  // eslint-disable-next-line no-shadow
  namespace IterableX {
    export let empty: typeof emptyStatic;
  }
}
