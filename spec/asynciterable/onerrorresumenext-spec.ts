import '../asynciterablehelpers';
import { onErrorResumeNext } from 'ix/asynciterable/operators';
import { concat, of, sequenceEqual, throwError } from 'ix/asynciterable';

test('AsyncIterable#onErrorResumeNext continues without error', async () => {
  const xs = of(1, 2);
  const ys = of(3, 4);

  const res = xs.pipe(onErrorResumeNext(ys));
  expect(await sequenceEqual(res, of(1, 2, 3, 4))).toBeTruthy();
});

test('AsyncIterable#onErrorResumeNext continues after error', async () => {
  const xs = concat(of(1, 2), throwError(new Error()));
  const ys = of(3, 4);

  const res = xs.pipe(onErrorResumeNext(ys));
  expect(await sequenceEqual(res, of(1, 2, 3, 4))).toBeTruthy();
});
