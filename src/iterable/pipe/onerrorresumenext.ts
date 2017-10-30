import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { OnErrorResumeNextIterable } from '../onerrorresumenext';

export function onErrorResumeNext<T>(...args: Iterable<T>[]): MonoTypeOperatorFunction<T> {
  return function onErrorResumeNextOperatorFunction(source: Iterable<T>): IterableX<T> {
    return new OnErrorResumeNextIterable<T>([source, ...args]);
  };
}
