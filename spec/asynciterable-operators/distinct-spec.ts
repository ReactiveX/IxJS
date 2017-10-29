import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.distinct]);
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;

test('AsyncIterable#distinct selector', async (t, [distinct]) => {
  const res = distinct(range(0, 10), x => x % 5);
  t.true(await sequenceEqual(res, range(0, 5)));
  t.end();
});

function testComparer(x: number, y: number): boolean {
  return x % 2 === y % 2;
}

test('AsyncIterable#distinct with comparer', async (t, [distinct]) => {
  const res = distinct(range(0, 10), x => x % 5, testComparer);
  t.true(await sequenceEqual(res, range(0, 2)));
  t.end();
});
