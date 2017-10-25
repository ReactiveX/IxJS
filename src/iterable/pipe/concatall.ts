import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { ConcatIterable } from '../concat';

export function concatAll<T>(): OperatorFunction<Iterable<T>, T> {
  return function concatAllOperatorFunction(source: Iterable<Iterable<T>>): IterableX<T> {
    return new ConcatIterable<T>(source);
  };
}
