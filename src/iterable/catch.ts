'use strict';

export function* _catchAll<TSource>(source: Iterable<Iterable<TSource>>) {
  let error = null;

  for (let outer of source) {
    error = null;
    let it = outer[Symbol.iterator]();

    while (true) {
      let next = null;
      try {
        next = it.next();
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

export function* _catch<T>(source: Iterable<T>, ...args: Iterable<T>[]): Iterable<T> {
  return _catchAll<T>([source].concat(args));
}

export function* _catchStatic<T>(...source: Iterable<T>[]): Iterable<T> {
  return _catchAll(source);
}
