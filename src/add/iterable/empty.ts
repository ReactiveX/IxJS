import { IterableX } from '../../iterable/iterablex';
import { empty as emptyStatic } from '../../iterable/empty';

/** @nocollapse */
IterableX.empty = emptyStatic;

declare module '../../iterable/iterablex' {
  /* eslint no-shadow: "off" */
  namespace IterableX {
    export let empty: typeof emptyStatic;
  }
}
