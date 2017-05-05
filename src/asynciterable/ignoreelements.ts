'use strict';

export async function* ignoreElements<TSource>(source: AsyncIterable<TSource>): AsyncIterable<TSource> {
  // tslint:disable-next-line:no-empty
  for await (let _ of source) { }
}