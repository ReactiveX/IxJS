import { IterableX } from '../../iterable/iterablex';
import { as as asStatic } from '../../iterable/as';

/** @nocollapse */
IterableX.as = asStatic;

declare module '../../iterable/iterablex' {
  // eslint-disable-next-line no-shadow
  namespace IterableX {
    export let as: typeof asStatic;
  }
}
