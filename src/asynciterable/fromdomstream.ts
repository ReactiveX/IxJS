import { AsyncIterableX } from './asynciterablex';

/** @ignore */
const SharedArrayBuf = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : ArrayBuffer;
/** @ignore */
const pump = <T extends Iterator<any> | AsyncIterator<any>>(iterator: T) => {
  iterator.next();
  return iterator;
};

export class AsyncIterableReadableStream<T> extends AsyncIterableX<T> {
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
    try {
      const stream = this._stream;
      const reader = stream['getReader']({ mode: 'byob' });
      return pump(_consumeReader(stream, reader, byobReaderToAsyncIterator(reader)));
    } catch (e) {
      return super[Symbol.asyncIterator]() as AsyncIterableIterator<Uint8Array>;
    }
  }
}

async function* _consumeReader<T>(
  stream: ReadableStream<T>,
  reader: ReadableStreamBYOBReader | ReadableStreamDefaultReader,
  iterator: AsyncIterableIterator<T>
) {
  let threw = false;
  try {
    yield* iterator;
  } catch (e) {
    if ((threw = true) && reader) {
      await reader['cancel'](e);
    }
  } finally {
    if (!reader) {
      return;
    }
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

/** @ignore */
async function* defaultReaderToAsyncIterator<T = any>(reader: ReadableStreamDefaultReader<T>) {
  let r: ReadableStreamReadResult<T>;
  while (!(r = await reader.read()).done) {
    yield r.value;
  }
}

/** @ignore */
async function* byobReaderToAsyncIterator(reader: ReadableStreamBYOBReader) {
  let bufferOrByteLength: number | ArrayBufferLike;
  let r: null | IteratorResult<Uint8Array> = null;
  do {
    bufferOrByteLength = yield r ? r.value : null!;
  } while (!(r = await readNext(reader, bufferOrByteLength, 0)).done);
}

/** @ignore */
async function readNext(
  reader: ReadableStreamBYOBReader,
  bufferOrLen: ArrayBufferLike | number,
  offset: number
): Promise<ReadableStreamReadResult<Uint8Array>> {
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
  reader: ReadableStreamBYOBReader,
  buffer: ArrayBufferLike,
  offset: number,
  size: number
): Promise<ReadableStreamReadResult<Uint8Array>> {
  if (offset >= size) {
    return { done: false, value: new Uint8Array(buffer, 0, size) };
  }
  const { done, value } = await reader.read(new Uint8Array(buffer, offset, size - offset));
  if ((offset += value.byteLength) < size && !done) {
    return await readInto(reader, value.buffer, offset, size);
  }
  return { done, value: new Uint8Array(value.buffer, 0, offset) };
}

export function fromDOMStream<TSource>(stream: ReadableStream<TSource>): AsyncIterableX<TSource>;
export function fromDOMStream<TSource extends ArrayBufferView>(
  stream: ReadableStream<TSource>,
  options: { mode: 'byob' }
): AsyncIterableX<TSource>;

export function fromDOMStream(stream: ReadableStream, options?: { mode: 'byob' }) {
  return !options || options.mode !== 'byob'
    ? new AsyncIterableReadableStream(stream)
    : new AsyncIterableReadableByteStream(stream);
}
