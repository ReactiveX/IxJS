'use strict';

export function* catchWith<TSource>(
    source: Iterable<TSource>,
    fn: (error: any) => Iterable<TSource>): Iterable<TSource> {
  let err = null, it = source[Symbol.iterator]();
  while (1) {
    let c = <IteratorResult<TSource>>{};

    try {
      let c = it.next();
      if (c.done) { break; }
    } catch (e) {
      err = fn(e);
      break;
    }

    yield c.value;
  }

  if (err !== null) {
    for (let item of err) {
      yield item;
    }
  }
}