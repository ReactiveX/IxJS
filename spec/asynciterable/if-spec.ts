'use strict';

import * as test from 'tape';
import { _if } from '../../dist/cjs/asynciterable/if';
import { isEmpty } from '../../dist/cjs/asynciterable/isempty';
import { of } from '../../dist/cjs/asynciterable/of';
import { single } from '../../dist/cjs/asynciterable/single';

test('AsyncIterable#if then and else', async t => {
  let x = 5;
  const res = _if(async () => x > 0, of(+1), of(-1));

  t.equal(+1, await single(res));

  x = -x;
  t.equal(-1, await single(res));

  t.end();
});

test('AsyncIterable#if then default else', async t => {
  let x = 5;
  const res = _if(async () => x > 0, of(+1));

  t.equal(+1, await single(res));

  x = -x;
  t.true(await isEmpty(res));

  t.end();
});