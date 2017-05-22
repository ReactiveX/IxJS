'use strict';

import * as test from 'tape';
import { _catch } from '../../dist/cjs/iterable/catch';
import { concat } from '../../dist/cjs/iterable/concat';
import { range } from '../../dist/cjs/iterable/range';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { _throw } from '../../dist/cjs/iterable/throw';
import { hasNext } from '../iterablehelpers';

test('Iterable#catch with no errors', t => {
  const res = _catch(range(0, 5), range(5, 5));
  t.true(sequenceEqual(res, range(0, 5)));
  t.end();
});

test('Iterable#catch with concat error', t => {
  const res = _catch(
    concat(range(0, 5), _throw(new Error())),
    range(5, 5)
  );

  t.true(sequenceEqual(res, range(0, 10)));
  t.end();
});

test('Iterable#catch still throws', t => {
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

  const it = res[Symbol.iterator]();
  hasNext(t, it, 0);
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  hasNext(t, it, 3);
  t.throws(() => it.next());
  t.end();
});