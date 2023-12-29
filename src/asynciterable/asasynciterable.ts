import { AsyncIterableX } from './asynciterablex';
import { OperatorAsyncFunction, UnaryFunction } from '../interfaces';
import { Transform, TransformCallback, TransformOptions } from 'stream';

export interface AsyncIterableTransform<T> extends AsyncIterableX<T>, NodeJS.ReadableStream, NodeJS.WritableStream {
  pipe<R>(...operations: UnaryFunction<AsyncIterable<T>, R>[]): R;
  pipe<R>(...operations: OperatorAsyncFunction<T, R>[]): AsyncIterableX<R>;
  pipe<R extends NodeJS.WritableStream>(writable: R, options?: { end?: boolean }): R;
  [Symbol.asyncIterator](): AsyncIterableIterator<any>;
}

const asyncIterableMixin = Symbol('asyncIterableMixin');

export class AsyncIterableTransform<T> {
  private static [asyncIterableMixin] = false;
  constructor(options?: TransformOptions) {
    Transform.call(this as any, options);
    // If this is the first time AsyncIterableTransform is being constructed,
    // mixin the methods from the AsyncIterableX's prototype.
    if (!AsyncIterableTransform[asyncIterableMixin]) {
      AsyncIterableTransform[asyncIterableMixin] = true;
      Object.defineProperties(
        AsyncIterableTransform.prototype,
        Object.getOwnPropertyDescriptors(AsyncIterableX.prototype)
      );
    }
  }
  /** @nocollapse */
  _flush(callback: TransformCallback): void {
    callback();
  }
  /** @nocollapse */
  _transform(chunk: any, _encoding: string, callback: TransformCallback): void {
    callback(null, chunk);
  }
}

(AsyncIterableTransform as any).prototype = Object.create(
  Transform.prototype,
  Object.getOwnPropertyDescriptors(AsyncIterableTransform.prototype)
);

export function asAsyncIterable<T>(options: TransformOptions = {}) {
  return new AsyncIterableTransform<T>(options);
}
