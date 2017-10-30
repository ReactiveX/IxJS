import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { OnErrorResumeNextAsyncIterable } from '../onerrorresumenext';

export function onErrorResumeNext<T>(
  ...args: AsyncIterable<T>[]
): MonoTypeOperatorAsyncFunction<T> {
  return function onErrorResumeNextOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<T> {
    return new OnErrorResumeNextAsyncIterable<T>([source, ...args]);
  };
}
