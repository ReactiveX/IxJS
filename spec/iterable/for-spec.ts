'use strict';

import * as test from 'tape';
import { _for } from '../../dist/cjs/iterable/for';
import { range } from '../../dist/cjs/iterable/range';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { toArray } from '../../dist/cjs/iterable/toarray';

test('Iterable#for behavior', t => {
  const res = toArray(_for([1,2,3], x => range(0, x)));
  t.true(sequenceEqual(res, [0,0,1,0,1,2]));
  t.end();
});