import '../asynciterablehelpers.js';
import { of, sequenceEqual } from 'ix/asynciterable/index.js';
import { distinctUntilChanged } from 'ix/asynciterable/operators/index.js';

test('AsyncIterable#distinctUntilChanged no selector', async () => {
  const res = of(1, 2, 2, 3, 3, 3, 2, 2, 1).pipe(distinctUntilChanged());
  expect(await sequenceEqual(res, of(1, 2, 3, 2, 1))).toBeTruthy();
});

test('AsyncIterable#distinctUntilChanged with selector', async () => {
  const res = of(1, 1, 2, 3, 4, 5, 5, 6, 7).pipe(
    distinctUntilChanged({ keySelector: (x) => Math.floor(x / 2) })
  );
  expect(await sequenceEqual(res, of(1, 2, 4, 6))).toBeTruthy();
});
