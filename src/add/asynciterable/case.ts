import { AsyncIterableX } from '../../asynciterable';
import { _case as caseStatic } from '../../asynciterable/case';

export function _case<TSource, TResult>(
    fn: () => TSource,
    sources: Map<TSource, AsyncIterable<TResult>>,
    defaultSource?: AsyncIterable<TResult>): AsyncIterableX<TResult> {
  return caseStatic(fn, sources, defaultSource);
}

AsyncIterableX.case = _case;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    function _case<TSource, TResult>(
      fn: () => TSource,
      sources: Map<TSource, AsyncIterable<TResult>>,
      defaultSource?: AsyncIterable<TResult>): AsyncIterableX<TResult>;
    export { _case as case }
  }
}