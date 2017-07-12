import { AsyncIterableX } from '../asynciterable';
import { filter } from './filter';

export function partition<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (value: TSource, index: number) => boolean | Promise<boolean>,
    thisArg?: any): AsyncIterableX<TSource>[] {
  return [
    filter(source, predicate, thisArg),
    filter(source, (x, i) => !predicate(x, i), thisArg)
  ];
}
