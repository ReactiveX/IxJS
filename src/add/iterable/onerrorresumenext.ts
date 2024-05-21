import { IterableX } from '../../iterable/iterablex.js';
import { onErrorResumeNext as onErrorResumeNextStatic } from '../../iterable/onerrorresumenext.js';

/** @nocollapse */
IterableX.onErrorResumeNext = onErrorResumeNextStatic;

declare module '../../iterable/iterablex' {
  // eslint-disable-next-line no-shadow
  namespace IterableX {
    export let onErrorResumeNext: typeof onErrorResumeNextStatic;
  }
}
