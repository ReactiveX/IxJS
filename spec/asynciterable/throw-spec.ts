'use strict';

import * as test from 'tape';
import { _throw } from '../../dist/cjs/asynciterable/throw';

test('AsyncIterable#throw throws', async t => {
  const xs = _throw<number>(new Error());

  const it = xs[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});