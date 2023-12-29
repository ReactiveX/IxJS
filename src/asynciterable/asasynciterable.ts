import { AsyncIterableX } from './asynciterablex';
import { OperatorAsyncFunction, UnaryFunction } from '../interfaces';
import { Transform, TransformCallback, TransformOptions } from 'stream';

/** @ignore */
export interface AsyncIterableTransform<T>
  extends AsyncIterableX<T>,
    NodeJS.ReadableStream,
    NodeJS.WritableStream {
  new (options?: TransformOptions): AsyncIterableTransform<T>;
  pipe<R>(...operations: UnaryFunction<AsyncIterable<T>, R>[]): R;
  pipe<R>(...operations: OperatorAsyncFunction<T, R>[]): AsyncIterableX<R>;
  pipe<R extends NodeJS.WritableStream>(writable: R, options?: { end?: boolean }): R;
  [Symbol.asyncIterator](): AsyncIterableIterator<any>;
}

const asyncIterableMixin = Symbol('asyncIterableMixin');

/** @ignore */
export function AsyncIterableTransform<T>(
  this: AsyncIterableTransform<T>,
  options?: TransformOptions
) {
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

AsyncIterableTransform.prototype = Object.create(Transform.prototype);

AsyncIterableTransform[asyncIterableMixin] = false;

/** @nocollapse */
AsyncIterableTransform.prototype._flush = function (callback: TransformCallback): void {
  callback();
};
/** @nocollapse */
AsyncIterableTransform.prototype._transform = function (
  chunk: any,
  _encoding: string,
  callback: TransformCallback
): void {
  callback(null, chunk);
};

/** @ignore */
export function asAsyncIterable<T>(options: TransformOptions = {}) {
  return Reflect.construct(AsyncIterableTransform, [options]) as AsyncIterableTransform<T>;
}
