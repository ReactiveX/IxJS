'use strict';

export async function* catchWith<TSource>(
    source: AsyncIterable<TSource>,
    fn: (error: any) => AsyncIterable<TSource>): AsyncIterable<TSource> {
  let err = null, it = source[Symbol.asyncIterator]();
  while (1) {
    let c = <IteratorResult<TSource>>{};

    try {
      let c = await it.next();
      if (c.done) { break; }
    } catch (e) {
      err = fn(e);
      break;
    }

    yield c.value;
  }

  if (err !== null) {
    for await (let item of err) {
      yield item;
    }
  }
}