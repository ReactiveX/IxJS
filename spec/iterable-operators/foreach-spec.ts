'use strict';

import  * as test  from 'tape';
import { forEach } from '../../dist/cjs/iterable/foreach';
import { range } from '../../dist/cjs/iterable/range';

test('Iterable#forEach', t => {
  let n = 0;

  forEach(range(5, 3), x => n += x);

  t.equal(5 + 6 + 7, n);
  t.end();
});

test('Iterable#forEach with index', t => {
  let n = 0;

  forEach(range(5, 3), (x, i) => n += x * i);

  t.equal(5 * 0 + 6 * 1 + 7 * 2, n);
  t.end();
});