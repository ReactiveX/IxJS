import { AsyncIterableX } from './asynciterablex';
import { flatMap } from './flatmap';

export function mergeAll<TSource>(
  source: AsyncIterable<AsyncIterable<TSource>>
): AsyncIterableX<TSource> {
  return flatMap(source, source => source);
}
