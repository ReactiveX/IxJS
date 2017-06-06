'use strict';

import * as test from 'tape';
import { defer } from '../../dist/cjs/asynciterable/defer';
import { doWhile } from '../../dist/cjs/asynciterable/dowhile';
import { of } from '../../dist/cjs/asynciterable/of';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { tap } from '../../dist/cjs/asynciterable/tap';
import { toArray } from '../../dist/cjs/asynciterable/toarray';

test('Iterable#doWhile some', async t => {
  let x = 5;
  const res = await toArray(
    doWhile(defer(() => tap(of(x), { next: async () => { x--; } })), async () => x > 0)
  );

  t.true(sequenceEqual(res, [5, 4, 3, 2, 1]));
  t.end();
});

test('Iterable#doWhile one', async t => {
  let x = 0;
  const res = await toArray(
    doWhile(defer(() => tap(of(x), { next: async () => { x--; } })), async () => x > 0)
  );

  t.true(sequenceEqual(res, [0]));
  t.end();
});