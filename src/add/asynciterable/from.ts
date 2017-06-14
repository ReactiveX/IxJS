import { AsyncIterableX } from '../../asynciterable';
import { from as fromStatic } from '../../asynciterable/from';

/**
 * @ignore
 */
export function _from<TSource, TResult>(
    source: Iterable<TSource | PromiseLike<TSource>> | ArrayLike<TSource> | AsyncIterable<TSource>,
    fn?: (value: TSource, index: number) => TResult | Promise<TResult>,
    thisArg?: any) {
  return fromStatic(source, fn, thisArg);
}

AsyncIterableX.from = _from;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let from: typeof _from;
  }
}