'use strict';

import * as test  from 'tape';
import { count } from '../../dist/cjs/iterable/count';
import { every } from '../../dist/cjs/iterable/every';
import { repeatValue } from '../../dist/cjs/iterable/repeatvalue';
import { take } from '../../dist/cjs/iterable/take';

test('Iterable#repeatValue infinite', t => {
  const xs = take(repeatValue(42), 100);
  
  t.true(every(xs, x => x === 42));
  t.equal(count(xs), 100);
  t.end();
});

test('Iterable#repeatValue count', t => {
  const xs = repeatValue(42, 100);

  t.true(every(xs, x => x === 42));
  t.equal(count(xs), 100);
  t.end();
});