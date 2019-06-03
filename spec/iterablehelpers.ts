import './Ix';

export function hasNext<T>(source: Iterator<T>, expected: T) {
  const { done, value } = source.next();
  expect(done).toBeFalsy();
  expect(value).toEqual(expected);
}

export function noNext<T>(source: Iterator<T>) {
  const next = source.next();
  expect(next.done).toBeTruthy();
}
