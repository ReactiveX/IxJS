export function hasNext<T>(t: any, source: Iterator<T>, expected: T) {
  const { done, value } = source.next();
  t.false(done, 'should not be done');
  t.deepEqual(value, expected);
}

export function noNext<T>(t: any, source: Iterator<T>) {
  const next = source.next();
  t.true(next.done, 'should be done');
}
