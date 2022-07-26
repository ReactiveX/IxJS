import { hasNext } from '../asynciterablehelpers';
import { fromEventPattern } from 'ix/asynciterable';
import { EventEmitter } from 'events';

const EVENT_TYPE = 'data';

test('AsyncIterable#fromEventPattern writes before emit', async () => {
  const e = new EventEmitter();
  const a = fromEventPattern(
    (h) => e.addListener(EVENT_TYPE, h),
    (h) => e.removeListener(EVENT_TYPE, h)
  );

  e.emit(EVENT_TYPE, 1);
  e.emit(EVENT_TYPE, 2);
  e.emit(EVENT_TYPE, 3);

  const it = a[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
});

test('AsyncIterable#fromEventPattern has selector', async () => {
  const e = new EventEmitter();
  const a = fromEventPattern(
    (h) => e.addListener(EVENT_TYPE, h),
    (h) => e.removeListener(EVENT_TYPE, h),
    (x) => x * 2
  );

  e.emit(EVENT_TYPE, 1);
  e.emit(EVENT_TYPE, 2);
  e.emit(EVENT_TYPE, 3);

  const it = a[Symbol.asyncIterator]();
  await hasNext(it, 2);
  await hasNext(it, 4);
  await hasNext(it, 6);
});
