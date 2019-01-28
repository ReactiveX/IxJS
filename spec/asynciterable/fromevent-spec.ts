import { fromEvent } from 'ix/asynciterable';
import { hasNext } from '../asynciterablehelpers';
import { EventEmitter } from 'events';

const EVENT_TYPE = 'data';

test('AsyncIterable#fromEvent writes before emit', async () => {
  const e = new EventEmitter();
  const a = fromEvent(e, EVENT_TYPE);

  e.emit(EVENT_TYPE, 1);
  e.emit(EVENT_TYPE, 2);
  e.emit(EVENT_TYPE, 3);

  const it = a[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
});
