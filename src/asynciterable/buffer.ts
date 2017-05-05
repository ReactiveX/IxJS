'use strict';

export async function* buffer<TSource>(
    source: AsyncIterable<TSource>,
    count: number,
    skip?: number): AsyncIterable<TSource[]> {
  if (skip == null) { skip = count; }
  let buffers: TSource[][] = [],  i = 0;
  for await (let item of source) {
    if (i % skip === 0) {
      buffers.push([]);
    }

    for (let buffer of buffers) {
      buffer.push(item);
    }

    if (buffers.length > 0 && buffers[0].length === count) {
      yield buffers.shift()!;
    }

    i++;
  }

  while (buffers.length > 0) {
    yield buffers.shift()!;
  }
}