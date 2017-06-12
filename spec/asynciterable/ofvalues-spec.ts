'use strict';

import * as test from 'tape';
import { ofValues } from '../../dist/cjs/asynciterable/ofvalues';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#ofValues behavior', async t => {
  const xs = { first: 'Bob', last: 'Smith' };
  const ys = ofValues(xs);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 'Bob');
  await hasNext(t, it, 'Smith');
  await noNext(t, it);
  t.end();
});