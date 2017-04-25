'use strict';

function* _onErrorResumeNext<TSource>(source: Iterable<Iterable<TSource>>): Iterable<TSource> {
  for (let item of source) {
    let it = item[Symbol.iterator]();
    while (1) {
      let value: TSource | undefined;
      try {
        let next = it.next();
        if (next.done) { break; }
        value = next.value;
      } catch (e) {
        break;
      }

      yield value;
    }
  }
}

export function* onErrorResumeNext<T>(source: Iterable<T>, ...args: Iterable<T>[]): Iterable<T> {
  return _onErrorResumeNext<T>([source].concat(args));
}

export function* onErrorResumeNextStatic<T>(...source: Iterable<T>[]): Iterable<T> {
  return _onErrorResumeNext<T>(source);
}