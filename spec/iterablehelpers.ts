export function hasNext<T>(t: any, source: Iterator<T>, expected: T) {
  const { done, value } = source.next();
  t.false(done);
  t.deepEqual(expected, value);
}

export function noNext<T>(t: any, source: Iterator<T>) {
  const next = source.next();
  t.true(next.done);
}
