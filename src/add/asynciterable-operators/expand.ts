import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { expand } from '../../asynciterable/operators/expand';

/**
 * @ignore
 */
export function expandProto<T>(
  this: AsyncIterableX<T>,
  selector: (value: T) => AsyncIterable<T> | Promise<AsyncIterable<T>>
) {
  return expand<T>(selector)(this);
}

AsyncIterableX.prototype.expand = expandProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    expand: typeof expandProto;
  }
}
