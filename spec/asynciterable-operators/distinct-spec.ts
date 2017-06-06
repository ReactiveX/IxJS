'use strict';

import * as test from 'tape';
import { distinct } from '../../dist/cjs/asynciterable/distinct';
import { range } from '../../dist/cjs/asynciterable/range';
import { sequenceEqual } from '../../dist/cjs/asynciterable/sequenceequal';

test('AsyncIterable#distinct selector', async t => {
  const res = distinct(range(0, 10), x => x % 5);
  t.true(await sequenceEqual(res, range(0, 5)));
  t.end();
});

function testComparer(x: number, y: number): boolean {
  return x % 2 === y % 2;
}

test('AsyncIterable#distinct with comparer', async t => {
  const res = distinct(range(0, 10), x => x % 5, testComparer);
  t.true(await sequenceEqual(res, range(0, 2)));
  t.end();
});