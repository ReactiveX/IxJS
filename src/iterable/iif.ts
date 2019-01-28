import { IterableX } from './iterablex';
import { defer } from './defer';
import { empty } from './empty';

export function iif<TSource>(
  fn: () => boolean,
  thenSource: Iterable<TSource>,
  elseSource: Iterable<TSource> = empty<TSource>()
): IterableX<TSource> {
  return defer<TSource>(() => (fn() ? thenSource : elseSource));
}
