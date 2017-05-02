import { IterableX } from '../../iterable';
import { onErrorResumeNextStatic } from '../../iterable/onerrorresumenext';

function _onErrorResumeNextStatic<T>(...args: Iterable<T>[]) {
  return new IterableX(onErrorResumeNextStatic(...args));
}

IterableX.onErrorResumeNext = _onErrorResumeNextStatic;

declare module '../../iterable' {
  namespace IterableX {
    export let onErrorResumeNext: typeof _onErrorResumeNextStatic;
  }
}