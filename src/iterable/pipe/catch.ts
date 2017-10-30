import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { CatchIterable } from '../catch';

export function _catch<T>(...args: Iterable<T>[]): MonoTypeOperatorFunction<T> {
  return function catchOperatorFunction(source: Iterable<T>): IterableX<T> {
    return new CatchIterable<T>([source, ...args]);
  };
}
