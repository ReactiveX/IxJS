import { AsyncIterableX } from '../asynciterable';
import { filter } from './filter';

export function partition<T, S extends T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number) => value is S,
  thisArg?: any
): AsyncIterableX<S>[];
export function partition<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>,
  thisArg?: any
): AsyncIterableX<T>[];
export function partition<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>,
  thisArg?: any
): AsyncIterableX<T>[] {
  return [filter(source, predicate, thisArg), filter(source, (x, i) => !predicate(x, i), thisArg)];
}
