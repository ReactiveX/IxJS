'use strict';

function* _onErrorResumeNext<TSource>(source: Iterable<Iterable<TSource>>): Iterable<TSource> {
  for (let item of source) {
    let it = item[Symbol.iterator]();
    while (1) {
      let next;
      try {
        next = it.next();
      } catch (e) {
        break;
      }

      if (next.done) { break; }
      yield next.value;
    }
  }
}

export function* onErrorResumeNext<T>(source: Iterable<T>, ...args: Iterable<T>[]): Iterable<T> {
  return _onErrorResumeNext<T>([source, ...args]);
}

export function* onErrorResumeNextStatic<T>(...source: Iterable<T>[]): Iterable<T> {
  return _onErrorResumeNext<T>(source);
}