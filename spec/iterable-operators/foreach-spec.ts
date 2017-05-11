'use strict';

import  * as test  from 'tape';
import { IterableX } from '../../dist/cjs/iterable';
import { range } from '../../dist/cjs/iterable/range';

test('Iterable#forEach', t => {
  let n = 0;
  let rangedIterable = new IterableX(range(5, 3));

  rangedIterable.forEach(x => n += x);

  t.equal(5 + 6 + 7, n);
  t.end();
});

test('Iterable#forEach with index', t => {
  let n = 0;
  let rangedIterable = new IterableX(range(5, 3));

  rangedIterable.forEach((x, i) => n += x * i);

  t.equal(5 * 0 + 6 * 1 + 7 * 2, n);
  t.end();
});