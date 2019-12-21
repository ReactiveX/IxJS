import { IterableX } from '../iterablex';
import { ConcatIterable } from '../concat';
import { OperatorFunction } from '../../interfaces';

export function concatAll<T>(): OperatorFunction<Iterable<T>, T> {
  return function concatAllOperatorFunction(source: Iterable<Iterable<T>>): IterableX<T> {
    return new ConcatIterable<T>(source);
  };
}
