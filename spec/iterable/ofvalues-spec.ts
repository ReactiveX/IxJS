'use strict';

import * as test from 'tape';
import { ofValues } from '../../dist/cjs/iterable/ofvalues';
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#ofValues behavior', t => {
  const xs = { first: 'Bob', last: 'Smith' };
  const ys = ofValues(xs);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 'Bob');
  hasNext(t, it, 'Smith');
  noNext(t, it);
  t.end();
});