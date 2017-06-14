'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/asynciterable/empty';
import { chain } from '../../dist/cjs/asynciterable/chain';
import { noNext } from '../asynciterablehelpers';

test('Itearble#chain calls function immediately', async t => {
  let called = false;
  const xs = chain(empty<number>(), x => { called = true; return x; });
  t.true(called);

  const it = xs[Symbol.asyncIterator]();
  await noNext(t, it);

  t.end();
});