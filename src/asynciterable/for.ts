import { AsyncIterableX } from '../asynciterable';
import { concatAll } from './concat';
import { map } from './map';

export function _for<TSource, TResult>(
    source: AsyncIterable<TSource>,
    fn: (value: TSource) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>): AsyncIterableX<TResult> {
  return concatAll(map(source, fn));
}
