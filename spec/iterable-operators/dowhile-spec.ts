'use strict';

import * as test from 'tape';
import { defer } from '../../dist/cjs/iterable/defer';
import { doWhile } from '../../dist/cjs/iterable/dowhile';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { tap } from '../../dist/cjs/iterable/tap';
import { toArray } from '../../dist/cjs/iterable/toarray';

test('Iterable#doWhile some', t => {
  let x = 5;
  const res = toArray(
    doWhile(defer(() => tap([x], { next: () => x--})), () => x > 0)
  );

  t.true(sequenceEqual(res, [5, 4, 3, 2, 1]));
  t.end();
});

test('Iterable#doWhile one', t => {
  let x = 0;
  const res = toArray(
    doWhile(defer(() => tap([x], { next: () => x--})), () => x > 0)
  );

  t.true(sequenceEqual(res, [0]));
  t.end();
});