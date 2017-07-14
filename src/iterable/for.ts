import { IterableX } from '../iterable';
import { concatAll } from './concat';
import { map } from './map';

export function _for<TSource, TResult>(
    source: Iterable<TSource>,
    fn: (value: TSource) => Iterable<TResult>): IterableX<TResult> {
  return concatAll(map(source, fn));
}
