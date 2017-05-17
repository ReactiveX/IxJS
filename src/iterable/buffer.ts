'use strict';

import { IterableX } from '../iterable';

class BufferIterable<TSource> extends IterableX<TSource[]> {
  private _source: Iterable<TSource>;
  private _count: number;
  private _skip: number;

  constructor(source: Iterable<TSource>, count: number, skip: number) {
    super();
    this._source = source;
    this._count = count;
    this._skip = skip;
  }

  *[Symbol.iterator]() {
    let buffers: TSource[][] = [],  i = 0;
    for (let item of this._source) {
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
    source: Iterable<TSource>,
    count: number,
    skip?: number): IterableX<TSource[]> {
  if (skip == null) { skip = count; }
 return new BufferIterable(source, count, skip);
}