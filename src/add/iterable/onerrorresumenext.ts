import { IterableX } from '../../iterable/iterablex';
import { onErrorResumeNextStatic } from '../../iterable/onerrorresumenext';

/** @nocollapse */
IterableX.onErrorResumeNext = onErrorResumeNextStatic;

declare module '../../iterable/iterablex' {
  namespace IterableX {
    export let onErrorResumeNext: typeof onErrorResumeNextStatic;
  }
}
