import { concat, sequenceEqual, throwError, onErrorResumeNext } from 'ix/iterable';

test('Iterable#onErrorResumeNext continues without error', () => {
  const xs = [1, 2];
  const ys = [3, 4];

  const res = onErrorResumeNext(xs, ys);
  expect(sequenceEqual(res, [1, 2, 3, 4])).toBeTruthy();
});

test('Iterable#onErrorResumeNext continues after error', () => {
  const xs = concat([1, 2], throwError(new Error()));
  const ys = [3, 4];

  const res = onErrorResumeNext(xs, ys);
  expect(sequenceEqual(res, [1, 2, 3, 4])).toBeTruthy();
});
