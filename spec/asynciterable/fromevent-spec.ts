'use strict';

import * as test from 'tape';
import { fromEvent } from '../../dist/cjs/asynciterable/fromevent';
import { hasNext } from '../asynciterablehelpers';
import { EventEmitter } from 'events';

const EVENT_TYPE = 'data';

test('AsyncIterable#fromEvent writes before emit', async t => {
  const e = new EventEmitter();
  const a = fromEvent(e, EVENT_TYPE);

  e.emit(EVENT_TYPE, 1);
  e.emit(EVENT_TYPE, 2);
  e.emit(EVENT_TYPE, 3);

  const it = a[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  t.end();
});
