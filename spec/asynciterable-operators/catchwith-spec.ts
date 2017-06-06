'use strict';

import * as test from 'tape';
import { catchWith } from '../../dist/cjs/asynciterable/catchwith';
import { of } from '../../dist/cjs/asynciterable/of';
import { range } from '../../dist/cjs/asynciterable/range';
import { sequenceEqual } from '../../dist/cjs/asynciterable/sequenceequal';
import { single } from '../../dist/cjs/asynciterable/single';
import { _throw } from '../../dist/cjs/asynciterable/throw';

test('AsyncIterable#catchWith error catches', async t => {
  const err = new Error();
  const res = await single(catchWith(_throw(err), async e => { t.same(err, e); return of(42); }));
  t.equal(42, res);
  t.end();
});

test('AsyncIterable#catchWith no error misses', async t => {
  const xs = range(0, 10);
  const res = catchWith(xs, async e => { t.fail(); return of(42); });
  t.true(await sequenceEqual(res, xs));
  t.end();
});