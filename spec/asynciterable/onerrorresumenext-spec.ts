import '../asynciterablehelpers.js';
import {
  concat,
  of,
  sequenceEqual,
  throwError,
  onErrorResumeNext,
} from 'ix/asynciterable/index.js';

test('AsyncIterable#onErrorResumeNext continues without error', async () => {
  const xs = of(1, 2);
  const ys = of(3, 4);

  const res = onErrorResumeNext(xs, ys);
  expect(await sequenceEqual(res, of(1, 2, 3, 4))).toBeTruthy();
});

test('AsyncIterable#onErrorResumeNext continues after error', async () => {
  const xs = concat(of(1, 2), throwError(new Error()));
  const ys = of(3, 4);

  const res = onErrorResumeNext(xs, ys);
  expect(await sequenceEqual(res, of(1, 2, 3, 4))).toBeTruthy();
});
