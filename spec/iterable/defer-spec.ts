'use strict';

import * as test from 'tape';
import { defer } from '../../dist/cjs/iterable/defer';
import { range } from '../../dist/cjs/iterable/range';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';

test('Iterable#defer defers side effects', t => {
  let i = 0;
  let n = 5;
  const xs = defer(() => {
    i++;
    return range(0, n);
  });

  t.equal(0, i);

  t.true(sequenceEqual(xs, range(0, n)));
  t.equal(1, i);

  n = 3;
  t.true(sequenceEqual(xs, range(0, n)));
  t.equal(2, i);

  t.end();
});