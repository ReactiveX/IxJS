'use strict';

import * as test from 'tape';
import { ofEntries } from '../../dist/cjs/iterable/ofentries';
import { noNext } from '../iterablehelpers';

test('Iterable#ofEntries behavior', t => {
  const xs = { first: 'Bob', last: 'Smith' };
  const ys = ofEntries(xs);

  const it = ys[Symbol.iterator]();
  let next = it.next();
  t.false(next.done);
  t.equal(next.value[0], 'first');
  t.equal(next.value[1], 'Bob');
  next = it.next();
  t.false(next.done);
  t.equal(next.value[0], 'last');
  t.equal(next.value[1], 'Smith');
  noNext(t, it);
  t.end();
});