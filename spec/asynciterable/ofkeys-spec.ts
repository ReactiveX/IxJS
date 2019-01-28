import { ofKeys } from 'ix/asynciterable';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#ofValues behavior', async () => {
  const xs = { first: 'Bob', last: 'Smith' };
  const ys = ofKeys(xs);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 'first');
  await hasNext(it, 'last');
  await noNext(it);
});
