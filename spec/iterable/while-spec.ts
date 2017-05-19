'use strict';

import * as test from 'tape';
import { defer } from '../../dist/cjs/iterable/defer';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { tap } from '../../dist/cjs/iterable/tap';
import { toArray } from '../../dist/cjs/iterable/toarray';
import { _while } from '../../dist/cjs/iterable/while';

test('Iterable#while some', t => {
  let x = 5;
  const res = toArray(
    _while(() => x > 0, defer(() => tap([x], { next: () => x--})))
  );

  t.true(sequenceEqual(res, [5, 4, 3, 2, 1]));
  t.end();
});

test('Iterable#while none', t => {
  let x = 0;
  const res = toArray(
    _while(() => x > 0, defer(() => tap([x], { next: () => x--})))
  );

  t.true(sequenceEqual(res, []));
  t.end();
});