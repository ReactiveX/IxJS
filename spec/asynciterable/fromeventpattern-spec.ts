'use strict';

import * as test from 'tape';
import { fromEventPattern } from '../../dist/cjs/asynciterable/fromeventpattern';
import { hasNext } from '../asynciterablehelpers';
import { EventEmitter } from 'events';

const EVENT_TYPE = 'data';

test('AsyncIterable#fromEventPattern writes before emit', async t => {
  const e = new EventEmitter();
  const a = fromEventPattern(
    h => e.addListener(EVENT_TYPE, h),
    h => e.removeListener(EVENT_TYPE, h)
  );

  e.emit(EVENT_TYPE, 1);
  e.emit(EVENT_TYPE, 2);
  e.emit(EVENT_TYPE, 3);

  const it = a[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  t.end();
});
