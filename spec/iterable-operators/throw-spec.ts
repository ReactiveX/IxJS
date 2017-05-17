'use strict';

import * as test from 'tape';
import { _throw } from '../../dist/cjs/iterable/throw';

test('Iterable#throw throws', t => {
  const error = new Error();
  const xs = _throw(error);

  const it = xs[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});