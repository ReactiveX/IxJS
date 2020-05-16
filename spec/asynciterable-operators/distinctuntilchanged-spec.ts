import '../asynciterablehelpers';
import { of, sequenceEqual } from 'ix/asynciterable';
import { distinctUntilChanged } from 'ix/asynciterable/operators';

test('Iterable#distinctUntilChanged no selector', async () => {
  const res = of(1, 2, 2, 3, 3, 3, 2, 2, 1).pipe(distinctUntilChanged());
  expect(await sequenceEqual(res, of(1, 2, 3, 2, 1))).toBeTruthy();
});

test('Iterable#distinctUntilChanged with selector', async () => {
  const res = of(1, 1, 2, 3, 4, 5, 5, 6, 7).pipe(
    distinctUntilChanged({ keySelector: (x) => Math.floor(x / 2) })
  );
  expect(await sequenceEqual(res, of(1, 2, 4, 6))).toBeTruthy();
});
