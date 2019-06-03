import { publish } from './operators/publish';
import { fromDOMStream } from './fromdomstream';
import { AsyncIterableX } from './asynciterablex';

export type ReadableBYOBStreamOptions<T = any> = QueuingStrategy<T> & { type: 'bytes' };
export type ReadableByteStreamOptions<T = any> = QueuingStrategy<T> & {
  type: 'bytes';
  autoAllocateChunkSize?: number;
};

/** @ignore */
function memcpy<TTarget extends ArrayBufferView, TSource extends ArrayBufferView>(
  target: TTarget,
  source: TSource,
  targetByteOffset = 0,
  sourceByteLength = source.byteLength
) {
  const targetByteLength = target.byteLength;
  const dst = new Uint8Array(target.buffer, target.byteOffset, targetByteLength);
  const src = new Uint8Array(
    source.buffer,
    source.byteOffset,
    Math.min(sourceByteLength, targetByteLength, source.buffer.byteLength - source.byteOffset)
  );
  dst.set(src, targetByteOffset);
  return src.byteLength;
}

abstract class AbstractUnderlyingSource<TSource> {
  constructor(protected _source: AsyncIterator<TSource> | null) {}
  async cancel() {
    const source = this._source;
    if (source && source.return) {
      await source.return();
    }
    this._source = null;
  }
}

class UnderlyingAsyncIterableDefaultSource<TSource = any> extends AbstractUnderlyingSource<TSource>
  implements UnderlyingSource<TSource> {
  constructor(source: AsyncIterator<TSource> | null) {
    super(source);
  }
  async pull(controller: ReadableStreamDefaultController<TSource>) {
    const source = this._source;
    if (source) {
      const r = await source.next(controller.desiredSize);
      if (!r.done) {
        return controller.enqueue(r.value);
      }
    }
    controller.close();
  }
}

class UnderlyingAsyncIterableByteSource<TSource extends ArrayBufferView = Uint8Array>
  extends AbstractUnderlyingSource<TSource>
  implements UnderlyingByteSource {
  public readonly type: 'bytes';
  public readonly autoAllocateChunkSize?: number;

  // If we can't create a "byob" reader (no browsers currently suppor it),
  // fallback to pulling values from the source iterator and enqueueing like
  // object streams
  private fallbackDefaultSource: UnderlyingAsyncIterableDefaultSource<TSource>;

  constructor(
    reader: AsyncIterator<TSource> | null,
    opts: { autoAllocateChunkSize?: number } = {}
  ) {
    super(reader);
    this.type = 'bytes';
    this.autoAllocateChunkSize = opts.autoAllocateChunkSize;
    this.fallbackDefaultSource = new UnderlyingAsyncIterableDefaultSource<TSource>(reader);
  }
  async pull(controller: ReadableByteStreamController) {
    if (!controller.byobRequest) {
      return await this.fallbackDefaultSource.pull(controller);
    }
    if (this._source) {
      const { view } = controller.byobRequest;
      const { done, value } = await this._source.next(view);
      if (!done) {
        // Did the source write into the BYOB view itself,
        // then yield us the `bytesWritten` value? If so,
        // pass that along
        if (typeof value === 'number') {
          return controller.byobRequest.respond(value);
        }
        // otherwise if the source is only producing buffers
        // but doesn't expect to be given one, we should copy
        // the produced buffer into the front of the BYOB view
        if (ArrayBuffer.isView(value)) {
          return value.buffer === view.buffer
            ? controller.byobRequest.respondWithNewView(value)
            : controller.byobRequest.respond(memcpy(view, value));
        }
      }
    }
    controller.close();
  }
}

// Generate subclasses of ReadableStream that conform to the
// AsyncIterable protocol. These classes are dynamically created
// the first time a ReadableStream is produced because ReadableStream
// is a browser-only API, and closure-compiler won't compile if they're
// statically defined at the module scope.
/** @ignore */
const asyncIterableReadableStream = (() => {
  let AsyncIterableReadableByteStream_: any;
  let AsyncIterableDefaultReadableStream_: any;

  // A function that's called the first time someone creates a
  // ReadableStream via `toDOMStream()`
  let createFirstTime = <T>(source: any, opts?: any) => {
    // Generate the subclasses with [Symbol.asyncIterator]() methods
    class AsyncIterableDefaultReadableStream extends ReadableStream<T> {
      [Symbol.asyncIterator]() {
        return fromDOMStream(this)[Symbol.asyncIterator]();
      }
    }
    class AsyncIterableReadableByteStream extends ReadableStream<Uint8Array> {
      [Symbol.asyncIterator]() {
        return fromDOMStream(this, { mode: 'byob' })[Symbol.asyncIterator]();
      }
    }
    AsyncIterableReadableByteStream_ = AsyncIterableReadableByteStream;
    AsyncIterableDefaultReadableStream_ = AsyncIterableDefaultReadableStream;
    // Now point `createAsyncIterableReadableStream` to the function that
    // instantiates the classes we just created
    //tslint:disable-next-line
    createAsyncIterableReadableStream = createAsyncIterableReadableStreamEveryOtherTime;
    // Create and return the first ReadableStream<T> instance
    //tslint:disable-next-line
    return createAsyncIterableReadableStreamEveryOtherTime<T>(source, opts) as ReadableStream<T>;
  };

  // Shared function pointer that's called by the wrapper closure we return
  //tslint:disable-next-line
  let createAsyncIterableReadableStream = createFirstTime;
  // Create instances of the classes generated by `createFirstTime`
  let createAsyncIterableReadableStreamEveryOtherTime = <T>(source: any, opts?: any) => {
    return source instanceof UnderlyingAsyncIterableByteSource
      ? (new AsyncIterableReadableByteStream_(source, opts) as ReadableStream<T>)
      : (new AsyncIterableDefaultReadableStream_(source, opts) as ReadableStream<T>);
  };

  return <T>(source: any, opts?: any) => createAsyncIterableReadableStream<T>(source, opts);
})();

export function toDOMStream<T>(
  source: AsyncIterable<T>,
  strategy?: QueuingStrategy<T>
): ReadableStream<T>;
export function toDOMStream<T>(
  source: AsyncIterable<T>,
  options: ReadableBYOBStreamOptions<Uint8Array>
): ReadableStream<Uint8Array>;
export function toDOMStream<T>(
  source: AsyncIterable<T>,
  options: ReadableByteStreamOptions<Uint8Array>
): ReadableStream<Uint8Array>;
export function toDOMStream(
  source: AsyncIterable<any>,
  options?: QueuingStrategy<any> | ReadableBYOBStreamOptions | ReadableByteStreamOptions
) {
  if (!options || !('type' in options) || options['type'] !== 'bytes') {
    return asyncIterableReadableStream(
      new UnderlyingAsyncIterableDefaultSource(source[Symbol.asyncIterator]()),
      options
    );
  }
  return asyncIterableReadableStream(
    new UnderlyingAsyncIterableByteSource(source[Symbol.asyncIterator]()),
    options
  );
}

AsyncIterableX.prototype.tee = function<T>(this: AsyncIterableX<T>) {
  return _getDOMStream(this).tee();
};

AsyncIterableX.prototype.pipeTo = function<T>(
  this: AsyncIterableX<T>,
  writable: WritableStream<T>,
  options?: PipeOptions
) {
  return _getDOMStream(this).pipeTo(writable, options);
};

AsyncIterableX.prototype.pipeThrough = function<T, R extends ReadableStream<any>>(
  this: AsyncIterableX<T>,
  duplex: { writable: WritableStream<T>; readable: R },
  options?: PipeOptions
) {
  return _getDOMStream(this).pipeThrough(duplex, options);
};

function _getDOMStream<T>(self: any) {
  return (
    self._DOMStream ||
    (self._DOMStream = self.pipe(
      publish<T>(),
      toDOMStream
    ))
  );
}

/**
 * @ignore
 */
export function toDOMStreamProto<T>(
  this: AsyncIterable<T>,
  strategy?: QueuingStrategy<T>
): ReadableStream<T>;
export function toDOMStreamProto<T>(
  this: AsyncIterable<T>,
  options: ReadableBYOBStreamOptions<Uint8Array>
): ReadableStream<Uint8Array>;
export function toDOMStreamProto<T>(
  this: AsyncIterable<T>,
  options: ReadableByteStreamOptions<Uint8Array>
): ReadableStream<Uint8Array>;
export function toDOMStreamProto(
  this: AsyncIterable<any>,
  options?: QueuingStrategy<any> | ReadableBYOBStreamOptions | ReadableByteStreamOptions
) {
  return !options ? toDOMStream(this) : toDOMStream(this, options);
}

AsyncIterableX.prototype.toDOMStream = toDOMStreamProto;

declare module '../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    toDOMStream: typeof toDOMStreamProto;
    tee(): [ReadableStream<T>, ReadableStream<T>];
    pipeTo(writable: WritableStream<T>, options?: PipeOptions): Promise<void>;
    pipeThrough<R extends ReadableStream<any>>(
      duplex: { writable: WritableStream<T>; readable: R },
      options?: PipeOptions
    ): ReadableStream<T>;
  }
}
