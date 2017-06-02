'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/iterable/empty';
import { noNext } from '../iterablehelpers';

test('Iterable#empty empty', t => {
  const xs = empty<number>();

  const it = xs[Symbol.iterator]();
  noNext(t, it);
  t.end();
});