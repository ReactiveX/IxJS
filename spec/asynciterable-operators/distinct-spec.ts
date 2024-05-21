import '../asynciterablehelpers.js';
import { range, sequenceEqual } from 'ix/asynciterable/index.js';
import { distinct } from 'ix/asynciterable/operators/index.js';

test('AsyncIterable#distinct selector', async () => {
  const res = range(0, 10).pipe(distinct({ keySelector: (x) => x % 5 }));
  expect(await sequenceEqual(res, range(0, 5))).toBeTruthy();
});

function testComparer(x: number, y: number): boolean {
  return x % 2 === y % 2;
}

test('AsyncIterable#distinct with comparer', async () => {
  const res = range(0, 10).pipe(distinct({ keySelector: (x) => x % 5, comparer: testComparer }));
  expect(await sequenceEqual(res, range(0, 2))).toBeTruthy();
});
