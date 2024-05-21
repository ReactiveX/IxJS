import { hasNext, noNext } from '../asynciterablehelpers.js';
import { of } from 'ix/asynciterable/index.js';

test('AsyncIterable#of behavior', async () => {
  const res = of(1, 2, 3);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await noNext(it);
});
