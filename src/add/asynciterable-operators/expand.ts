import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { ExpandAsyncIterable } from '../../asynciterable/operators/expand.js';

/**
 * @ignore
 */
export function expandProto<T>(
  this: AsyncIterableX<T>,
  selector: (value: T, signal?: AbortSignal) => AsyncIterable<T> | Promise<AsyncIterable<T>>
) {
  return new ExpandAsyncIterable<T>(this, selector);
}

AsyncIterableX.prototype.expand = expandProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    expand: typeof expandProto;
  }
}
