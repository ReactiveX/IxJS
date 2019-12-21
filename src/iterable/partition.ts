import { IterableX } from './iterablex';
import { FilterIterable } from './operators/filter';
import { bindCallback } from '../util/bindcallback';

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
  const cb = bindCallback(predicate, thisArg, 2);
  const notCb = bindCallback((value: T, index: number) => !predicate(value, index), thisArg, 2);
  return [new FilterIterable(source, cb), new FilterIterable(source, notCb)];
}
