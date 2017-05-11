import { AsyncIterableX } from '../../asynciterable';
import { onErrorResumeNextStatic } from '../../asynciterable/onerrorresumenext';

export function _onErrorResumeNextStatic<T>(...args: AsyncIterable<T>[]) {
  return new AsyncIterableX(onErrorResumeNextStatic(...args));
}

AsyncIterableX.onErrorResumeNext = _onErrorResumeNextStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let onErrorResumeNext: typeof _onErrorResumeNextStatic;
  }
}