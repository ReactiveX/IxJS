import { IterableX } from '../../iterable';
import { from as fromStatic } from '../../iterable/from';

export function _from<TSource, TResult>(
    source: Iterable<TSource> | ArrayLike<TSource>,
    fn?: (value: TSource, index: number) => TResult,
    thisArg?: any) {
  return fromStatic(source, fn, thisArg);
}

IterableX.from = _from;

declare module '../../iterable' {
  namespace IterableX {
    export let from: typeof _from;
  }
}