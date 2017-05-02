import { AsyncIterableX } from '../../asynciterable';
import { from as fromStatic } from '../../asynciterable/from';

async function* _from<TSource, TResult>(
    source: Iterable<TSource> | ArrayLike<TSource>,
    fn?: (value: TSource, index: number) => TResult,
    thisArg?: any) {
  return new AsyncIterableX(fromStatic(source, fn, thisArg));
}

AsyncIterableX.from = _from;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let from: typeof _from;
  }
}