'use strict';

import  * as test  from 'tape';
import { minBy } from '../../dist/cjs/iterable/minby';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';

test('Iterable#minBy', t => {
  const source = [2, 5, 0, 7, 4, 3, 6, 2, 1];

  const res = minBy(source, x => x % 3);
  t.true(sequenceEqual(res, [0, 3, 6]));
  t.end();
});