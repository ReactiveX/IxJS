import { publish } from './operators/publish';
import { fromDOMStream } from './fromdomstream';
import { AsyncIterableX } from './asynciterablex';

/** @ignore */
export type ReadableBYOBStreamOptions<T = any> = QueuingStrategy<T> & { type: 'bytes' };
/** @ignore */
export type ReadableByteStreamOptions<T = any> = QueuingStrategy<T> & {
  type: 'bytes';
  autoAllocateChunkSize?: number;
};

type AsyncSourceIterator<TSource> = AsyncIterator<
  TSource,
  any,
  number | ArrayBufferView | undefined | null
>;

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
  constructor(protected _source: AsyncSourceIterator<TSource> | null) {}
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
  constructor(source: AsyncSourceIterator<TSource> | null) {
    super(source);
  }
  // eslint-disable-next-line consistent-return
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
  implements UnderlyingSource<TSource> {
  //   public readonly type: 'bytes';
  public readonly autoAllocateChunkSize?: number;

  // If we can't create a "byob" reader (no browsers currently suppor it),
  // fallback to pulling values from the source iterator and enqueueing like
  // object streams
  private fallbackDefaultSource: UnderlyingAsyncIterableDefaultSource<TSource>;

  constructor(
    reader: AsyncSourceIterator<TSource> | null,
    opts: { autoAllocateChunkSize?: number } = {}
  ) {
    super(reader);
    (this as any).type = 'bytes';
    this.autoAllocateChunkSize = opts['autoAllocateChunkSize'];
    this.fallbackDefaultSource = new UnderlyingAsyncIterableDefaultSource<TSource>(reader);
  }

  // eslint-disable-next-line consistent-return
  async pull(controller: ReadableStreamController<TSource>) {
    if (!(controller as any).byobRequest) {
      return await this.fallbackDefaultSource.pull(controller);
    }
    if (this._source) {
      const { view } = (controller as any).byobRequest;
      const { done, value } = await this._source.next(view);
      if (!done) {
        // Did the source write into the BYOB view itself,
        // then yield us the `bytesWritten` value? If so,
        // pass that along
        if (typeof value === 'number') {
          return (controller as any).byobRequest.respond(value);
        }
        // otherwise if the source is only producing buffers
        // but doesn't expect to be given one, we should copy
        // the produced buffer into the front of the BYOB view
        if (ArrayBuffer.isView(value)) {
          return value.buffer === view.buffer
            ? (controller as any).byobRequest.respondWithNewView(value)
            : (controller as any).byobRequest.respond(memcpy(view, value));
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
  const createFirstTime = <T>(source: any, opts?: any) => {
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

    // eslint-disable-next-line @typescript-eslint/no-use-before-define, no-use-before-define
    createAsyncIterableReadableStream = createAsyncIterableReadableStreamEveryOtherTime;
    // Create and return the first ReadableStream<T> instance

    // eslint-disable-next-line @typescript-eslint/no-use-before-define, no-use-before-define
    return createAsyncIterableReadableStreamEveryOtherTime<T>(source, opts) as ReadableStream<T>;
  };

  // Shared function pointer that's called by the wrapper closure we return
  let createAsyncIterableReadableStream = createFirstTime;
  // Create instances of the classes generated by `createFirstTime`
  const createAsyncIterableReadableStreamEveryOtherTime = <T>(source: any, opts?: any) => {
    return source instanceof UnderlyingAsyncIterableByteSource
      ? (new AsyncIterableReadableByteStream_(source, opts) as ReadableStream<T>)
      : (new AsyncIterableDefaultReadableStream_(source, opts) as ReadableStream<T>);
  };

  return <T>(source: any, opts?: any) => createAsyncIterableReadableStream<T>(source, opts);
})();

/**
 * Converts an async-iterable instance to a DOM stream.
 * @param source The source async-iterable to convert to a DOM stream.
 * @param strategy The queueing strategy to apply to the DOM stream.
 */
export function toDOMStream<T>(
  source: AsyncIterable<T>,
  strategy?: QueuingStrategy<T>
): ReadableStream<T>;
/**
 * Converts an async-iterable stream to a DOM stream.
 * @param source The async-iterable stream to convert to a DOM stream.
 * @param options The ReadableBYOBStreamOptions to apply to the DOM stream.
 */
export function toDOMStream<T>(
  source: AsyncIterable<T>,
  options: ReadableBYOBStreamOptions<Uint8Array>
): ReadableStream<Uint8Array>;
/**
 * Converts an async-iterable stream to a DOM stream.
 * @param source The async-iterable stream to convert to a DOM stream.
 * @param options The ReadableByteStreamOptions to apply to the DOM stream.
 */
export function toDOMStream<T>(
  source: AsyncIterable<T>,
  options: ReadableByteStreamOptions<Uint8Array>
): ReadableStream<Uint8Array>;
/**
 * Converts an async-iterable stream to a DOM stream.
 * @param source The async-iterable stream to convert to a DOM stream.
 * @param options The options to apply to the DOM stream.
 */
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
    new UnderlyingAsyncIterableByteSource(
      source[Symbol.asyncIterator](),
      options as ReadableByteStreamOptions
    ),
    options
  );
}

AsyncIterableX.prototype.tee = function <T>(this: AsyncIterableX<T>) {
  return _getDOMStream(this).tee();
};

AsyncIterableX.prototype.pipeTo = function <T>(
  this: AsyncIterableX<T>,
  writable: WritableStream<T>,
  options?: StreamPipeOptions
) {
  return _getDOMStream(this).pipeTo(writable, options);
};

AsyncIterableX.prototype.pipeThrough = function <T, R extends ReadableStream<any>>(
  this: AsyncIterableX<T>,
  duplex: { writable: WritableStream<T>; readable: R },
  options?: StreamPipeOptions
) {
  return _getDOMStream(this).pipeThrough(duplex, options);
};

function _getDOMStream<T>(self: any) {
  return self._DOMStream || (self._DOMStream = self.pipe(publish<T>(), toDOMStream));
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
    pipeTo(writable: WritableStream<T>, options?: StreamPipeOptions): Promise<void>;
    pipeThrough<R extends ReadableStream<any>>(
      duplex: { writable: WritableStream<T>; readable: R },
      options?: StreamPipeOptions
    ): R;
  }
}
