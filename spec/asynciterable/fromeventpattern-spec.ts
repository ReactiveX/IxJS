import { fromEventPattern } from 'ix/asynciterable';
import { hasNext } from '../asynciterablehelpers';
import { EventEmitter } from 'events';

const EVENT_TYPE = 'data';

test('AsyncIterable#fromEventPattern writes before emit', async () => {
  const e = new EventEmitter();
  const a = fromEventPattern(
    h => e.addListener(EVENT_TYPE, h),
    h => e.removeListener(EVENT_TYPE, h)
  );

  e.emit(EVENT_TYPE, 1);
  e.emit(EVENT_TYPE, 2);
  e.emit(EVENT_TYPE, 3);

  const it = a[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
});
