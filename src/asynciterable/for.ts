import { AsyncIterableX } from './asynciterablex';
import { concatAll } from './concatall';
import { map } from './map';

export function _for<TSource, TResult>(
  source: AsyncIterable<TSource>,
  fn: (value: TSource) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>
): AsyncIterableX<TResult> {
  return concatAll(map(source, fn));
}
