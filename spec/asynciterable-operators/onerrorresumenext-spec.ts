'use strict';

import * as test from 'tape';
import { concat } from '../../dist/cjs/asynciterable/concat';
import { of } from '../../dist/cjs/asynciterable/of';
import { onErrorResumeNext } from '../../dist/cjs/asynciterable/onerrorresumenext';
import { sequenceEqual } from '../../dist/cjs/asynciterable/sequenceequal';
import { _throw } from '../../dist/cjs/asynciterable/throw';

test('AsyncIterable#onErrorResumeNext continues without error', async t => {
  const xs = of(1, 2);
  const ys = of(3, 4);

  const res = onErrorResumeNext(xs, ys);
  t.true(await sequenceEqual(res, of(1, 2, 3, 4)));
  t.end();
});

test('AsyncIterable#onErrorResumeNext continues after error', async t => {
  const xs = concat(of(1, 2), _throw(new Error()));
  const ys = of(3, 4);

  const res = onErrorResumeNext(xs, ys);
  t.true(await sequenceEqual(res, of(1, 2, 3, 4)));
  t.end();
});