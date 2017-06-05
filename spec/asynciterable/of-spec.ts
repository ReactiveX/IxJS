'use strict';

import * as test from 'tape';
import { of } from '../../dist/cjs/asynciterable/of';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#of behavior', async (t: any) => {
  const res = of(1, 2, 3);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});