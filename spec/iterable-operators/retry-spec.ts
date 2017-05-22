'use strict';

import * as test from 'tape';
import { concat } from '../../dist/cjs/iterable/concat';
import { range } from '../../dist/cjs/iterable/range';
import { retry } from '../../dist/cjs/iterable/retry';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { _throw } from '../../dist/cjs/iterable/throw';
import { hasNext } from '../iterablehelpers';

test('Iterable#retry infinite no errors does not retry', t => {
  const xs = range(0, 10);

  const res = retry(xs);
  t.true(sequenceEqual(res, xs));
  t.end();
});

test('Iterable#retry finite no errors does not retry', t => {
  const xs = range(0, 10);

  const res = retry(xs, 2);
  t.true(sequenceEqual(res, xs));
  t.end();
});

test('Iterable#retry finite eventually gives up', t => {
  const err = new Error();
  const xs = concat(range(0, 2), _throw(err));

  const res = retry(xs, 2);
  const it = res[Symbol.iterator]();
  hasNext(t, it, 0);
  hasNext(t, it, 1);
  hasNext(t, it, 0);
  hasNext(t, it, 1);
  t.throws(() => it.next());
  t.end();
});