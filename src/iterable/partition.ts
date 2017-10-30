import { IterableX } from './iterablex';
import { filter } from './filter';

export function partition<T, S extends T>(
  source: Iterable<T>,
  predicate: (value: T, index: number) => value is S,
  thisArg?: any
): IterableX<S>[];
export function partition<T>(
  source: Iterable<T>,
  predicate: (value: T, index: number) => boolean,
  thisArg?: any
): IterableX<T>[];
export function partition<T>(
  source: Iterable<T>,
  predicate: (value: T, index: number) => boolean,
  thisArg?: any
): IterableX<T>[] {
  return [filter(source, predicate, thisArg), filter(source, (x, i) => !predicate(x, i), thisArg)];
}
