'use strict';

import * as test from 'tape';
import { defer } from '../../dist/cjs/asynciterable/defer';
import { range } from '../../dist/cjs/asynciterable/range';
import { sequenceEqual } from '../../dist/cjs/asynciterable/sequenceequal';

test('AsyncIterable#defer defers side effects', async (t: test.Test) => {
  let i = 0;
  let n = 5;
  const xs = defer(() => {
    i++;
    return range(0, n);
  });

  t.equal(0, i);

  t.true(await sequenceEqual(xs, range(0, n)));
  t.equal(1, i);

  n = 3;
  t.true(await sequenceEqual(xs, range(0, n)));
  t.equal(2, i);

  t.end();
});