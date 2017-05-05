'use strict';

async function* _onErrorResumeNext<TSource>(source: Iterable<AsyncIterable<TSource>>): AsyncIterable<TSource> {
  for (let item of source) {
    let it = item[Symbol.asyncIterator]();
    while (1) {
      let next;
      try {
        next = await it.next();
      } catch (e) {
        break;
      }

      if (next.done) { break; }
      yield next.value;
    }
  }
}

export async function* onErrorResumeNext<T>(source: AsyncIterable<T>, ...args: AsyncIterable<T>[]): AsyncIterable<T> {
  return _onErrorResumeNext<T>([source, ...args]);
}

export async function* onErrorResumeNextStatic<T>(...source: AsyncIterable<T>[]): AsyncIterable<T> {
  return _onErrorResumeNext<T>(source);
}