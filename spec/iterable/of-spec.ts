'use strict';

import * as test from 'tape';
import { of } from '../../dist/cjs/iterable/of';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';

test('Iterable#of behavior', t => {
  const res = of(1, 2, 3);
  t.true(sequenceEqual(res, [1, 2, 3]));
  t.end();
});