import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { DefaultIfEmptyIterable } from '../defaultifempty';

export function defaultIfEmpty<T>(defaultValue: T): MonoTypeOperatorFunction<T> {
  return function defaultIfEmptyOperatorFunction(source: Iterable<T>): IterableX<T> {
    return new DefaultIfEmptyIterable<T>(source, defaultValue);
  };
}
