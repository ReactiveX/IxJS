'use strict';

export async function* _catchAll<TSource>(source: Iterable<AsyncIterable<TSource>>) {
  let error = null;

  for (let outer of source) {
    error = null;
    let it = outer[Symbol.asyncIterator]();

    while (1) {
      let next = null;
      try {
        next = await it.next();
        if (next.done) { break; }
      } catch (e) {
        error = e;
        break;
      }

      yield next.value;
    }

    if (error !== null) { break; }
  }

  if (error !== null) { throw error; }
}

export async function* _catch<T>(source: AsyncIterable<T>, ...args: AsyncIterable<T>[]): AsyncIterable<T> {
  return _catchAll<T>([source].concat(args));
}

export async function* _catchStatic<T>(...source: AsyncIterable<T>[]): AsyncIterable<T> {
  return _catchAll(source);
}
