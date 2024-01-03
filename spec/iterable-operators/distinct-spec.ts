import '../iterablehelpers';
import { range, sequenceEqual } from 'ix/iterable/index.js';
import { distinct } from 'ix/iterable/operators/index.js';

test('Iterable#distinct selector', () => {
  const src = range(0, 10);
  const res = src.pipe(distinct({ keySelector: (x) => x % 5 }));
  expect(sequenceEqual(res, range(0, 5))).toBeTruthy();
});

function testComparer(x: number, y: number): boolean {
  return x % 2 === y % 2;
}

test('Iterable#distinct with comparer', () => {
  const src = range(0, 10);
  const res = src.pipe(distinct({ keySelector: (x) => x % 5, comparer: testComparer }));
  expect(sequenceEqual(res, [0, 1])).toBeTruthy();
});
