'use strict';

import * as test from 'tape';
import { defer } from '../../dist/cjs/asynciterable/defer';
import { of } from '../../dist/cjs/asynciterable/of';
import { tap } from '../../dist/cjs/asynciterable/tap';
import { _while } from '../../dist/cjs/asynciterable/while';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#while some', async t => {
  let x = 5;
  const res = _while(async () => x > 0, defer(async () => tap(of(x), { next: async () => { x--; } })));

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 5);
  await hasNext(t, it, 4);
  await hasNext(t, it, 3);
  await hasNext(t, it, 2);
  await hasNext(t, it, 1);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#while none', async t => {
  let x = 0;
  const res = _while(async () => x > 0, defer(async () => tap(of(x), { next: async () => { x--; } })));

  const it = res[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});