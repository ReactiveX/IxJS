'use strict';

import * as test from 'tape';
import { catchWith } from '../../dist/cjs/iterable/catchwith';
import { range } from '../../dist/cjs/iterable/range';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { single } from '../../dist/cjs/iterable/single';
import { _throw } from '../../dist/cjs/iterable/throw';

test('Iterable#catchWith error catches', t => {
  const err = new Error();
  const res = single(catchWith(_throw(err), e => { t.same(err, e); return [42]; }));
  t.equal(42, res);
  t.end();
});

test('Iterable#catchWith no error misses', t => {
  const xs = range(0, 10);
  const res = catchWith(xs, e => { t.fail(); return [42]; });
  t.true(sequenceEqual(res, xs));
  t.end();
});