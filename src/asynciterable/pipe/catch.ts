import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { CatchAllAsyncIterable } from '../catch';

export function _catch<T>(...args: AsyncIterable<T>[]): MonoTypeOperatorAsyncFunction<T> {
  return function catchOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<T> {
    return new CatchAllAsyncIterable<T>([source, ...args]);
  };
}
