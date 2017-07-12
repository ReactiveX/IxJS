import { IterableX } from '../iterable';
import { filter } from './filter';

export function partition<TSource>(
    source: Iterable<TSource>,
    predicate: (value: TSource, index: number) => boolean,
    thisArg?: any): IterableX<TSource>[] {
  return [
    filter(source, predicate, thisArg),
    filter(source, (x, i) => !predicate(x, i), thisArg)
  ];
}
