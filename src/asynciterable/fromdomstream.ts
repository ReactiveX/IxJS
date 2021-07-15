import { AsyncIterableX } from './asynciterablex';

/** @ignore */
const SharedArrayBuf = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : ArrayBuffer;

export class AsyncIterableReadableStream<T> extends AsyncIterableX<T | undefined> {
  constructor(protected _stream: ReadableStream<T>) {
    super();
  }
  [Symbol.asyncIterator]() {
    const stream = this._stream;
    const reader = stream['getReader']();
    return _consumeReader(stream, reader, defaultReaderToAsyncIterator(reader));
  }
}

export class AsyncIterableReadableByteStream extends AsyncIterableReadableStream<Uint8Array> {
  [Symbol.asyncIterator]() {
    const stream = this._stream;
    let reader: ReadableStreamReader<Uint8Array>;
    try {
      reader = (stream as any)['getReader']({ mode: 'byob' });
    } catch (e) {
      return super[Symbol.asyncIterator]();
    }
    const iterator = _consumeReader(stream, reader, byobReaderToAsyncIterator(reader));
    // "pump" the iterator once so it initializes and is ready to accept a buffer or bytesToRead
    iterator.next();
    return iterator;
  }
}

async function* _consumeReader<T>(
  stream: ReadableStream<T>,
  reader: ReadableStreamReader<Uint8Array> | ReadableStreamDefaultReader,
  iterator: AsyncGenerator<T>
): AsyncIterator<T, any, undefined> {
  let threw = false;
  try {
    yield* iterator;
  } catch (e) {
    if ((threw = true) && reader) {
      await reader['cancel'](e);
    }
  } finally {
    if (reader) {
      if (!threw) {
        await reader['cancel']();
      }
      if (stream.locked) {
        try {
          reader.closed.catch(() => {
            /* */
          });
          reader.releaseLock();
        } catch (e) {
          /* */
        }
      }
    }
  }
}

/** @ignore */
async function* defaultReaderToAsyncIterator<T = any>(reader: ReadableStreamDefaultReader<T>) {
  let r: ReadableStreamDefaultReadResult<T>;
  while (!(r = await reader.read()).done) {
    yield r.value;
  }
}

/** @ignore */
async function* byobReaderToAsyncIterator(reader: ReadableStreamReader<Uint8Array>) {
  let r: ReadableStreamDefaultReadResult<Uint8Array>;
  let value: number | ArrayBufferLike = yield null!;
  while (!(r = await readNext(reader, value, 0)).done) {
    value = yield r.value;
  }
}

/** @ignore */
async function readNext(
  reader: ReadableStreamReader<Uint8Array>,
  bufferOrLen: ArrayBufferLike | number,
  offset: number
): Promise<ReadableStreamDefaultReadResult<Uint8Array>> {
  let size: number;
  let buffer: ArrayBufferLike;

  if (typeof bufferOrLen === 'number') {
    buffer = new ArrayBuffer((size = bufferOrLen));
  } else if (bufferOrLen instanceof ArrayBuffer) {
    size = (buffer = bufferOrLen).byteLength;
  } else if (bufferOrLen instanceof SharedArrayBuf) {
    size = (buffer = bufferOrLen).byteLength;
  } else {
    return { done: true, value: undefined! };
  }

  return await readInto(reader, buffer, offset, size);
}

/** @ignore */
async function readInto(
  reader: ReadableStreamReader<Uint8Array>,
  buffer: ArrayBufferLike,
  offset: number,
  size: number
): Promise<ReadableStreamDefaultReadResult<Uint8Array>> {
  let innerOffset = offset;
  if (innerOffset >= size) {
    return { done: false, value: new Uint8Array(buffer, 0, size) };
  }
  const { done, value } = await (reader as any).read(
    new Uint8Array(buffer, innerOffset, size - innerOffset)
  );
  if ((innerOffset += value!.byteLength) < size && !done) {
    return await readInto(reader, value!.buffer, innerOffset, size);
  }
  return { done, value: new Uint8Array(value!.buffer, 0, innerOffset) };
}

/**
 * Creates an async-iterable from an existing DOM stream.
 *
 * @template TSource The type of elements in the source DOM stream.
 * @param {ReadableStream<TSource>} stream The DOM Readable stream to convert to an async-iterable.
 * @returns {AsyncIterableX<TSource>} An async-iterable containing the elements from the ReadableStream.
 */
export function fromDOMStream<TSource>(stream: ReadableStream<TSource>): AsyncIterableX<TSource>;
/**
 * Creates an async-iterable from an existing DOM stream and options.
 *
 * @template TSource  * @template TSource The type of elements in the source DOM stream.
 * @param {ReadableStream<TSource>} stream The readable stream to convert to an async-iterable.
 * @param {{ mode: 'byob' }} options The options to set the mode for the DOM stream.
 * @returns {AsyncIterableX<TSource>} An async-iterable created from the incoming async-iterable.
 */
export function fromDOMStream<TSource extends ArrayBufferView>(
  stream: ReadableStream<TSource>,
  options: { mode: 'byob' }
): AsyncIterableX<TSource>;

/**
 * Creates an async-iterable from an existing DOM stream and optional options.
 *
 * @param {ReadableStream} stream The readable stream to convert to an async-iterable.
 * @param {{ mode: 'byob' }} [options] The optional options to set the mode for the DOM stream.
 * @returns {AsyncIterableX<any>} An async-iterable created from the incoming async-iterable.
 */
export function fromDOMStream(stream: ReadableStream, options?: { mode: 'byob' }) {
  return !options || options['mode'] !== 'byob'
    ? new AsyncIterableReadableStream(stream)
    : new AsyncIterableReadableByteStream(stream);
}
