'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/iterable/empty';
import { chain } from '../../dist/cjs/iterable/chain';
import { noNext } from '../iterablehelpers';

test('Itearble#chain calls function immediately', t => {
  let called = false;
  const xs = chain(empty<number>(), x => { called = true; return x; });
  t.true(called);

  const it = xs[Symbol.iterator]();
  noNext(t, it);

  t.end();
});