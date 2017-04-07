import { IterableImpl } from '../../iterable';
import { onErrorResumeNextStatic } from '../../iterable/onerrorresumenext';

IterableImpl.onErrorResumeNext = onErrorResumeNextStatic;

declare module '../../Iterable' {
  namespace IterableImpl {
    export let onErrorResumeNext: typeof onErrorResumeNextStatic;
  }
}