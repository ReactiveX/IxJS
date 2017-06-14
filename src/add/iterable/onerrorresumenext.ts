import { IterableX } from '../../iterable';
import { onErrorResumeNextStatic } from '../../iterable/onerrorresumenext';

/**
 * @ignore
 */
export function _onErrorResumeNextStatic<T>(...args: Iterable<T>[]) {
  return onErrorResumeNextStatic(...args);
}

IterableX.onErrorResumeNext = _onErrorResumeNextStatic;

declare module '../../iterable' {
  namespace IterableX {
    export let onErrorResumeNext: typeof _onErrorResumeNextStatic;
  }
}