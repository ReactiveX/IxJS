import { IterableX } from '../../iterable';
import { onErrorResumeNextStatic } from '../../iterable/onerrorresumenext';

IterableX.onErrorResumeNext = onErrorResumeNextStatic;

declare module '../../iterable' {
  namespace IterableX {
    export let onErrorResumeNext: typeof onErrorResumeNextStatic;
  }
}