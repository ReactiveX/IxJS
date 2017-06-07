'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/asynciterable/empty';
import { isEmpty } from '../../dist/cjs/asynciterable/isempty';
import { of } from '../../dist/cjs/asynciterable/of';

test('Iterable#isEmpty empty', async t => {
  t.true(await isEmpty(empty<number>()));
  t.end();
});

test('Iterable#isEmpty not-empty', async t => {
  t.false(await isEmpty(of(1)));
  t.end();
});