'use strict';

import * as test from 'tape';
import { ofKeys } from '../../dist/cjs/asynciterable/ofkeys';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#ofValues behavior', async t => {
  const xs = { first: 'Bob', last: 'Smith' };
  const ys = ofKeys(xs);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 'first');
  await hasNext(t, it, 'last');
  await noNext(t, it);
  t.end();
});