'use strict';

import * as test from 'tape';
import { forEach } from '../../dist/cjs/iterable/foreach';
import { ignoreElements } from '../../dist/cjs/iterable/ignoreelements';
import { range } from '../../dist/cjs/iterable/range';
import { take } from '../../dist/cjs/iterable/take';
import { tap } from '../../dist/cjs/iterable/tap';

test('Iterable#ignoreElements has side effects', t => {
  let n = 0;
  forEach(
    take(ignoreElements(tap(range(0, 10), { next: () => n++})), 5),
    () => { /* tslint:disable-next-line:no-empty */ }
  );

  t.equal(10, n);
  t.end();
});