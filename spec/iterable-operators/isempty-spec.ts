'use strict';

import  * as test  from 'tape';
import { empty } from '../../dist/cjs/iterable/empty';
import { isEmpty } from '../../dist/cjs/iterable/isempty';

test('Iterable#isEmpty empty', t => {
  t.true(isEmpty(empty<number>()));
  t.end();
});

test('Iterable#isEmpty not-empty', t => {
  t.false(isEmpty([1]));
  t.end();
});