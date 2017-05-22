'use strct';

import * as test from 'tape';
import { _finally } from '../../dist/cjs/iterable/finally';
import { range } from '../../dist/cjs/iterable/range';
import { _throw } from '../../dist/cjs/iterable/throw';
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#finally defers behavior', t => {
  let done = false;

  const xs = _finally(range(0, 2), () => done = true);
  t.false(done);

  const it = xs[Symbol.iterator]();
  t.false(done);

  hasNext(t, it, 0);
  t.false(done);

  hasNext(t, it, 1);
  t.false(done);

  noNext(t, it);
  t.true(done);

  t.end();
});

test('Iterable#finally calls even with error', t => {
  let done = false;

  const err = new Error();
  const xs = _finally(_throw(err), () => done = true);
  t.false(done);

  const it = xs[Symbol.iterator]();
  t.false(done);

  try {
    hasNext(t, it, 0);
  } catch (e) {
    t.same(err, e);
  }

  t.true(done);
  t.end();
});