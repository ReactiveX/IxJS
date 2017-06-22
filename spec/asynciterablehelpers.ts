'use strict';

export async function hasNext<T>(t: any, source: AsyncIterator<T>, expected: T) {
  const { done, value } = await source.next();
  t.false(done);
  t.deepEqual(expected, value);
}

export async function noNext<T>(t: any, source: AsyncIterator<T>) {
  const next = await source.next();
  t.true(next.done);
}