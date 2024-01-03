import '../iterablehelpers';
import { tap, doWhile } from 'ix/iterable/operators/index.js';
import { defer, sequenceEqual, toArray } from 'ix/iterable/index.js';

test('Iterable#doWhile some', () => {
  let x = 5;
  const src = defer(() => tap({ next: () => x-- })([x]));
  const res = src.pipe(doWhile(() => x > 0)).pipe(toArray);

  expect(sequenceEqual(res, [5, 4, 3, 2, 1])).toBeTruthy();
});

test('Iterable#doWhile one', () => {
  let x = 0;
  const src = defer(() => tap({ next: () => x-- })([x]));
  const res = src.pipe(doWhile(() => x > 0)).pipe(toArray);

  expect(sequenceEqual(res, [0])).toBeTruthy();
});
