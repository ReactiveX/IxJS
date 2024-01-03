import '../iterablehelpers';
import { of, range, sequenceEqual } from 'ix/iterable/index.js';
import { concatAll, map, tap } from 'ix/iterable/operators/index.js';

test('Iterable#concat concatAll behavior', () => {
  const res = of(of(1, 2, 3), of(4, 5)).pipe(concatAll());
  expect(sequenceEqual(res, of(1, 2, 3, 4, 5))).toBeTruthy();
});

test('Iterable#concat concatAll order of effects', () => {
  let i = 0;
  const xss = range(0, 3).pipe(
    map((x) => range(0, x + 1)),
    tap({ next: async () => ++i })
  );
  const res = xss.pipe(
    concatAll(),
    map((x) => i + ' - ' + x)
  );

  expect(sequenceEqual(res, of('1 - 0', '2 - 0', '2 - 1', '3 - 0', '3 - 1', '3 - 2'))).toBeTruthy();
});
