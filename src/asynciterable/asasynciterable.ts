import { AsyncIterableX } from './asynciterablex';
import { OperatorAsyncFunction, UnaryFunction } from '../interfaces';
import { Transform, TransformCallback } from 'stream';

export interface TransformOptions {
  // ReadableOptions/WritableOptions
  highWaterMark?: number;
  objectMode?: boolean;
  autoDestroy?: boolean;
  // ReadableOptions
  encoding?: string;
  // WritableOptions
  decodeStrings?: boolean;
  defaultEncoding?: string;
  emitClose?: boolean;
  // DuplexOptions
  allowHalfOpen?: boolean;
  readableObjectMode?: boolean;
  writableObjectMode?: boolean;
  readableHighWaterMark?: number;
  writableHighWaterMark?: number;
  writableCorked?: number;
}

export interface AsyncIterableTransform<T> extends AsyncIterableX<T>, Transform {
  pipe<R>(...operations: UnaryFunction<AsyncIterable<T>, R>[]): R;
  pipe<R>(...operations: OperatorAsyncFunction<T, R>[]): AsyncIterableX<R>;
  pipe<R extends NodeJS.WritableStream>(writable: R, options?: { end?: boolean }): R;
  [Symbol.asyncIterator](): AsyncIterableIterator<T>;
}

const asyncIterableMixin = Symbol('asyncIterableMixin');

export class AsyncIterableTransform<T> extends Transform {
  private static [asyncIterableMixin] = false;
  constructor(options?: TransformOptions) {
    super(options);
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

export function asAsyncIterable<T>(options: TransformOptions = {}) {
  return new AsyncIterableTransform<T>(options);
}
