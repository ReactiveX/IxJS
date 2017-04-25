'use strict';

export function* ignoreElements<TSource>(source: Iterable<TSource>): Iterable<TSource> {
  // tslint:disable-next-line:no-empty
  for (let _ of source) { }
}