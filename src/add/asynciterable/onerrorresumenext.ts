import { AsyncIterableX } from '../../asynciterable';
import { onErrorResumeNextStatic } from '../../asynciterable/onerrorresumenext';

/**
 * @ignore
 */
export function _onErrorResumeNextStatic<T>(...args: AsyncIterable<T>[]) {
  return onErrorResumeNextStatic(...args);
}

AsyncIterableX.onErrorResumeNext = _onErrorResumeNextStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let onErrorResumeNext: typeof _onErrorResumeNextStatic;
  }
}