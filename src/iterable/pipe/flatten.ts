import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { FlattenIterable } from '../flatten';

export function flatten<T>(depth: number = Infinity): MonoTypeOperatorFunction<T> {
  return function flattenOperatorFunction(source: Iterable<T>): IterableX<T> {
    return new FlattenIterable<T>(source, depth);
  };
}
