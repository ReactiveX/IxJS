'use strict';

import * as test from 'tape';
import { distinct } from '../../dist/cjs/iterable/distinct';
import { range } from '../../dist/cjs/iterable/range';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';

test('Iterable#distinct selector', t => {
  const res = distinct(range(0, 10), x => x % 5);
  t.true(sequenceEqual(res, range(0, 5)));
  t.end();
});

function testComparer(x: number, y: number): boolean {
  return x % 2 === y % 2;
}

test('Iterable#distinct with comparer', t => {
  const res = distinct(range(0, 10), x => x % 5, testComparer);
  t.true(sequenceEqual(res, [0, 1]));
  t.end();  
});