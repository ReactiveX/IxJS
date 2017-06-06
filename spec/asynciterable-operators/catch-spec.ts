'use strict';

import * as test from 'tape';
import { _catch } from '../../dist/cjs/asynciterable/catch';
import { concat } from '../../dist/cjs/asynciterable/concat';
import { range } from '../../dist/cjs/asynciterable/range';
import { sequenceEqual } from '../../dist/cjs/asynciterable/sequenceequal';
import { _throw } from '../../dist/cjs/asynciterable/throw';
import { hasNext } from '../asynciterablehelpers';

test('AsyncIterable#catch with no errors', async t => {
  const res = _catch(range(0, 5), range(5, 5));
  t.true(await sequenceEqual(res, range(0, 5)));
  t.end();
});

test('AsyncIterable#catch with concat error', async t => {
  const res = _catch(
    concat(range(0, 5), _throw(new Error())),
    range(5, 5)
  );

  t.true(await sequenceEqual(res, range(0, 10)));
  t.end();
});

test('AsyncIterable#catch still throws', async t => {
  const e1 = new Error();
  const er1 = _throw(e1);

  const e2 = new Error();
  const er2 = _throw(e2);

  const e3 = new Error();
  const er3 = _throw(e3);

  const res = _catch(
    concat(range(0, 2), er1),
    concat(range(2, 2), er2),
    er3
  );

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 0);
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  try {
    await it.next();
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});