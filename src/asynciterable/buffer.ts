import { AsyncIterableX } from '../asynciterable';

class BufferAsyncIterable<TSource> extends AsyncIterableX<TSource[]> {
  private _source: AsyncIterable<TSource>;
  private _count: number;
  private _skip: number;

  constructor(
      source: AsyncIterable<TSource>,
      count: number,
      skip: number) {
      super();
    this._source = source;
    this._count = count;
    this._skip = skip;
  }

  async *[Symbol.asyncIterator]() {

    let buffers: TSource[][] = [],  i = 0;
    for await (let item of this._source) {
      if (i % this._skip === 0) {
        buffers.push([]);
      }

      for (let buffer of buffers) {
        buffer.push(item);
      }

      if (buffers.length > 0 && buffers[0].length === this._count) {
        yield buffers.shift()!;
      }

      i++;
    }

    while (buffers.length > 0) {
      yield buffers.shift()!;
    }
  }
}

export function buffer<TSource>(
    source: AsyncIterable<TSource>,
    count: number,
    skip?: number): AsyncIterableX<TSource[]> {
  if (skip == null) { skip = count; }
  return new BufferAsyncIterable<TSource>(source, count, skip);
}
