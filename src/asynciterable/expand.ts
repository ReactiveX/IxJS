'use strict';

export async function* expand<TSource>(
    source: AsyncIterable<TSource>,
    fn: (value: TSource) => AsyncIterable<TSource>) {
  let q = [source];
  while (q.length > 0) {
    let src = q.shift();
    for await (let item of src!) {
      q.push(fn(item));
      yield item;
    }
  }
}