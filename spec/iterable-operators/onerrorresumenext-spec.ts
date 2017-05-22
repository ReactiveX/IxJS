'use strict';

import * as test from 'tape';
import { concat } from '../../dist/cjs/iterable/concat';
import { onErrorResumeNext } from '../../dist/cjs/iterable/onerrorresumenext';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { _throw } from '../../dist/cjs/iterable/throw';

test('Iterable#onErrorResumeNext continues without error', t => {
  const xs = [1, 2];
  const ys = [3, 4];

  const res = onErrorResumeNext(xs, ys);
  t.true(sequenceEqual(res, [1, 2, 3, 4]));
  t.end();
});

test('Iterable#onErrorResumeNext continues after error', t => {
  const xs = concat([1, 2], _throw(new Error()));
  const ys = [3, 4];

  const res = onErrorResumeNext(xs, ys);
  t.true(sequenceEqual(res, [1, 2, 3, 4]));
  t.end();
});