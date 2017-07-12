import { IterableX } from '../iterable';
import { defer } from './defer';
import { empty } from './empty';

export function _if<TSource>(
    fn: () => boolean,
    thenSource: Iterable<TSource>,
    elseSource: Iterable<TSource> = empty<TSource>()): IterableX<TSource> {
  return defer<TSource>(() => fn() ? thenSource : elseSource);
}
