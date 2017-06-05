'use strict';

import * as test from 'tape';
import { _if } from '../../dist/cjs/iterable/if';
import { isEmpty } from '../../dist/cjs/iterable/isempty';
import { single } from '../../dist/cjs/iterable/single';

test('Iterable#if then and else', t => {
  let x = 5;
  const res = _if(() => x > 0, [+1], [-1]);

  t.equal(+1, single(res));

  x = -x;
  t.equal(-1, single(res));

  t.end();
});

test('Iterable#if then default else', t => {
  let x = 5;
  const res = _if(() => x > 0, [+1]);

  t.equal(+1, single(res));

  x = -x;
  t.true(isEmpty(res));

  t.end();
});