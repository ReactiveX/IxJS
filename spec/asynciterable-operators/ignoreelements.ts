'use strict';

import * as test from 'tape';
import { forEach } from '../../dist/cjs/asynciterable/foreach';
import { ignoreElements } from '../../dist/cjs/asynciterable/ignoreelements';
import { range } from '../../dist/cjs/asynciterable/range';
import { take } from '../../dist/cjs/asynciterable/take';
import { tap } from '../../dist/cjs/asynciterable/tap';

test('Iterable#ignoreElements has side effects', async t => {
  let n = 0;
  await forEach(
    take(ignoreElements(tap(range(0, 10), { next: async () => { n++; } })), 5),
    async () => { /* tslint:disable-next-line:no-empty */ }
  );

  t.equal(10, n);
  t.end();
});