'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/asynciterable/empty';
import { noNext } from '../asynciterablehelpers';

test('AsyncIterable#empty empty', async (t: test.Test) => {
  const xs = empty<number>();

  const it = xs[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});