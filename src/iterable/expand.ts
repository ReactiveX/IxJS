'use strict';

export function* expand<TSource>(
    source: Iterable<TSource>,
    fn: (value: TSource) => Iterable<TSource>) {
  let q = [source];
  while (q.length > 0) {
    let src = q.shift();
    for (let item of src!) {
      q.push(fn(item));
      yield item;
    }
  }
}